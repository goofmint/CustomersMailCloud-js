declare interface CMCMailKeys {
  apiData: string
  created: string
  from: string
  messageId: string
  reason: string
  returnPath: string
  status: string
  subject: string
  to: string
  [key: string]: string
}

declare class CMCMail {
  fields: {[key: string]: string | Date | number}
  constructor(params: CMCMailKeys)
}

export { CMCMail, CMCMailKeys }
