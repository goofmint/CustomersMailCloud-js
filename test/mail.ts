import {CustomersMailCloud} from '../src/'
import fs from 'fs'

(async() => {
  const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'))
  const api_user = config.api_user
  const api_key  = config.api_key
  const client = new CustomersMailCloud(api_user, api_key)
  const res = await client
    .trial()
    .setFrom(config.from.name, config.from.address)
    .addTo(config.to.name, config.to.address)
    .setSubject('テストメール')
    .setText('これはNode.jsライブラリから送信されたテストメールです')
    .send()
  console.log(res)
})()
