import Bounce from './bounce'

declare class CustomersMailCloud {
  apiUser: string
  apiKey: string
  _type: number
  _subdomain: string | null
  _to: {[key: string]: string}[]
  _from: {[key: string]: string}
  _subject: string | null
  _text: string | null
  _html: string | null
  _attachments: string[]

  constructor(apiUser:string, apiKey: string)
  pro(subdomain:string): CustomersMailCloud
  trial(): CustomersMailCloud
  standard(): CustomersMailCloud
  addTo(name: string, address: string): CustomersMailCloud
  setFrom(name: string, address: string): CustomersMailCloud
  setSubject(str: string): CustomersMailCloud
  setText(str: string): CustomersMailCloud
  setHtml(str: string): CustomersMailCloud
  addAttachments(path: string): CustomersMailCloud
  url(): string
  send(): Promise<object>
  bounce(): Bounce
}

export default CustomersMailCloud
