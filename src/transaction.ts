import CustomersMailCloud from './client'
import { CMCMail } from './mail'
import { CMCMailKeys } from '../types/mail'
import * as request from 'superagent'

class Transaction {
  _client: CustomersMailCloud
  _serverComposition: string | null = null
  _params: {[key: string]: string | number} = {}
  _type: string
  _baseUrl: string = 'https://api.smtps.jp/transaction/v2/__TYPE__/__ACTION__.json'

  constructor(type: string, client: CustomersMailCloud) {
    this._type = type
    this._client = client
  }

  url(action: string) {
    return this._baseUrl.replace('__TYPE__', this._type).replace('__ACTION__', action)
  }

  async list(): Promise<CMCMail[]> {
    const params = this._params
    params.api_user = this._client.apiUser
    params.api_key = this._client.apiKey
    if (this._serverComposition) {
      params.server_composition = this._serverComposition
    } else {
      throw new Error('Server Composition is required.')
    }
    try {
      const result = await request
        .post(this.url('list'))
        .send(params)
      if (!result.body[this._type]) {
        return []
      }
      const bounces: CMCMailKeys[] = result.body[this._type]
      return bounces.map(params => new CMCMail(params))
    } catch (e) {
      throw new Error(e.response.text)
    }
  }

  setServerComposition(name: string) {
    this._serverComposition = name
  }

  setEmail(address: string) {
    this._params.email = address
  }

  setStatus(status: number) {
    this._params.status = status
  }

  setStartDate(date: Date) {
    this._params.start_date = this.getDate(date)
  }

  setEndDate(date: Date) {
    this._params.end_date = this.getDate(date)
  }
  
  setDate(date: Date) {
    this._params.date = this.getDate(date)
  }

  setHour(hour: number) {
    if (hour < 0 || hour > 23) {
      throw new Error('setHour allows the range from 0 to 23.')
    }
    this._params.hour = hour
  }

  setMinute(minute: number) {
    if (minute < 0 || minute > 59) {
      throw new Error('setMinute allows the range from 0 to 59.')
    }
    this._params.minute = minute
  }
  
  setPage(page: number) {
    this._params.p = page
  }

  setLimit(limit: number) {
    this._params.r = limit
  }

  getDate(d: Date) {
    return `${d.getFullYear()}-${('00' + (d.getMonth() + 1)).slice(-2)}-${('00' + d.getDate()).slice(-2)}`
  }
}

export default Transaction;
