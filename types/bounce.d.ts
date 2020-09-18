import CustomersMailCloud from './client'
import { CMCMail } from '../types/mail'

declare class Bounce {
  _client: CustomersMailCloud
  _serverComposition: string | null
  _params: {[key: string]: string | number}
  _url: string
  constructor(client: CustomersMailCloud)
  list(): Promise<CMCMail[]>
  setServerComposition(name: string): void
  setEmail(address: string): void
  setStatus(status: number): void
  setStartDate(date: Date): void
  setEndDate(date: Date): void
  setDate(date: Date): void
  setHour(hour: number): void
  setMinute(minute: number): void
  setPage(page: number): void
  setLimit(limit: number): void
  getDate(d: Date): string
}

export default Bounce
