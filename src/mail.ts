import { CMCMailKeys } from '../types/mail'

class CMCMail {
  fields: {[key: string]: string | Date | number} = {}
  constructor(params: CMCMailKeys) {
    for (let key in params) {
      switch (key) {
        case 'created':
          this.fields.created = new Date(params[key])
          break
        case 'status':
          this.fields.status = parseInt(params[key])
          break
        default:
          this.fields[key] = params[key]
          break
      }
    }
  }
}

export { CMCMail }
