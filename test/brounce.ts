import {CustomersMailCloud} from '../src/'
import fs from 'fs'

(async() => {
  const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'))
  const api_user = config.api_user
  const api_key  = config.api_key
  const client = new CustomersMailCloud(api_user, api_key)
  const bounce = client.bounce()
  bounce.setServerComposition('sandbox')
  bounce.setStartDate(new Date(2020, 10, 5))
  bounce.setLimit(100)
  const res = await bounce.list()
  console.log(res)

  const delivery = client.delivery()
  delivery.setServerComposition('sandbox')
  delivery.setDate(new Date(2020, 10, 5))
  delivery.setLimit(100)
  const res2 = await delivery.list()
  console.log(res2)
})()
