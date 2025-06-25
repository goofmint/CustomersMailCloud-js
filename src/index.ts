import * as request from 'superagent'
import Transaction from './transaction'

class CustomersMailCloud {
  apiUser: string
  apiKey: string
  _type: number = 0
  _subdomain: string | null
  _to: {[key: string]: string}[] = []
  _cc: {[key: string]: string}[] = []
  _bcc: {[key: string]: string}[] = []
  _from: {[key: string]: string} = {}
  _envfrom: string | null = null
  _replyto: string | null = null
  _headers: {[key: string]: string} = {}
  _charset: string = 'UTF-8'
  _subject: string | null
  _text: string | null
  _html: string | null
  _attachments: string[] = []

  constructor(apiUser:string, apiKey: string) {
    this.apiUser = apiUser
    this.apiKey = apiKey
    this._subdomain = null
    this._subject = null
    this._text = null
    this._html = null
  }

  pro(subdomain:string): CustomersMailCloud {
    this._subdomain = subdomain
    this._type = 3
    return this
  }

  trial(): CustomersMailCloud {
    this._type = 1
    return this
  }

  standard(): CustomersMailCloud {
    this._type = 2
    return this
  }

  addTo(name: string, address: string): CustomersMailCloud {
    this._to.push({name, address})
    return this
  }

  addCC(name: string, address: string): CustomersMailCloud {
    this._cc.push({name, address})
    return this
  }

  addBcc(name: string, address: string): CustomersMailCloud {
    this._bcc.push({name, address})
    return this
  }

  setFrom(name: string, address: string): CustomersMailCloud {
    this._from = {name, address}
    return this
  }

  setEnvFrom(address: string): CustomersMailCloud {
    this._envfrom = address
    return this
  }

  setReplyTo(address: string): CustomersMailCloud {
    this._replyto = address
    return this
  }

  setHeader(key: string, value: string | null = null): CustomersMailCloud {
    if (value === null) {
      if (!this._headers[key]) return this
      delete this._headers[key]
      return this
    }
    this._headers[key] = value
    return this
  }

  setCharset(str: string): CustomersMailCloud {
    this._charset = str
    return this
  }

  setSubject(str: string): CustomersMailCloud {
    this._subject = str
    return this
  }

  setText(str: string): CustomersMailCloud {
    this._text = str
    return this
  }

  setHtml(str: string): CustomersMailCloud {
    this._html = str
    return this
  }

  addAttachments(path: string): CustomersMailCloud {
    this._attachments.push(path)
    return this
  }

  url(): string {
    switch (this._type) {
      case 1:
        return 'https://sandbox.smtps.jp/api/v2/emails/send.json'
      case 2:
        return 'https://te.smtps.jp/api/v2/emails/send.json'
      case 3:
        return `https://${this._subdomain}.smtps.jp/api/v2/emails/send.json`
      default:
        throw new Error('利用種別を選んでください。 trial() / standard() / pro(subdomain)')
    }
  }

  async send(): Promise<object> {
    const params: {[key: string]: any} = {
      api_user: this.apiUser,
      api_key: this.apiKey,
      to: this._to,
      cc: this._cc,
      bcc: this._bcc,
      from: this._from,
      subject: this._subject,
      text: this._text,
    }
    if (this._html) params.html = this._html
    if (this._envfrom) params.envfrom = this._envfrom
    if (this._replyto) params.replyto = this._replyto
    if (this._headers && Object.keys(this._headers).length > 0) {
      params.headers = this._headers
    }
    if (this._charset) params.charset = this._charset

    const req = request.post(this.url())
    if (this._attachments.length > 0) {
      req.type('form')
      params.attachments = this._attachments.length
      for (let key in params) {
        req.field(key, typeof params[key] === 'object' ? JSON.stringify(params[key]) : params[key])
      }
      for (let i = 0; i < this._attachments.length; i++) {
        req.attach(`attachment${i + 1}`, this._attachments[i])
      }
    } else {
      req.send(params)
    }
    try {
      const result = await req;
      return result.body
    } catch (e) {
      return {}
    }
  }

  bounce(): Transaction {
    return new Transaction('bounces', this);
  }

  block(): Transaction {
    return new Transaction('blocks', this);
  }

  delivery(): Transaction {
    return new Transaction('deliveries', this);
  }

}

export { CustomersMailCloud }
