import request from 'superagent'

class CustomersMailCloud {
  _apiUser: string
  _apiKey: string
  _type: number = 0
  _subdomain: string | null = null
  _to: {[key: string]: string}[] = []
  _from: {[key: string]: string} = {}
  _subject: string | null = null
  _text: string | null = null
  _html: string | null = null

  constructor(apiUser:string, apiKey: string) {
    this._apiUser = apiUser
    this._apiKey = apiKey
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

  setFrom(name: string, address: string): CustomersMailCloud {
    this._from = {name, address}
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
      api_user: this._apiUser,
      api_key: this._apiKey,
      to: this._to,
      from: this._from,
      subject: this._subject,
      text: this._text,
    }
    if (this._html) params.html = this._html
    const result = await request
      .post(this.url())
      .send(params);
    return result.body
  }
}

export default CustomersMailCloud
