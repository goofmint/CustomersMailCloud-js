import {CustomersMailCloud} from '../'

(async() => {
  const api_user = 'YOUR_USER'
  const api_key  = 'YOUR_KEY'
  const client = new CustomersMailCloud(api_user, api_key)
  const res = await client
    .trial()
    .setFrom('Customer Cloud Mail Admin', 'info@smtps.jp')
    .addTo('Atsushi', 'user@smtps.jp')
    .setSubject('テストメール')
    .setText('これはNode.jsライブラリから送信されたテストメールです')
    .send()
  console.log(res)
})()
