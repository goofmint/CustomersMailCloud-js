import * as request from 'superagent'
import CustomersMailCloud from './client'
import { CMCMailKeys } from '../types/mail'
import { CMCMail } from './mail'

class Bounce {
  _client: CustomersMailCloud
  _serverComposition: string | null = null
  _params: {[key: string]: string | number} = {}
  _url: string = 'https://api.smtps.jp/transaction/v2/bounces/list.json'
  constructor(client: CustomersMailCloud) {
    this._client = client
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
    const result = await request
      .post(this._url)
      .send(params)
    if (!result.body.bounces) {
      return []
    }
    const bounces: CMCMailKeys[] = result.body.bounces
    return bounces.map(params => new CMCMail(params))
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
    return `${d.getFullYear()}-${('00' + (d.getMonth() + 1)).slice(-2)}-${d.getDate()}`
  }
}

export default Bounce
