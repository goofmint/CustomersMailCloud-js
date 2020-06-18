import {CustomersMailCloud} from '../src/'
import fs from 'fs'

(async() => {
  const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'))
  const api_user = config.api_user
  const api_key  = config.api_key
  const client = new CustomersMailCloud(api_user, api_key)
  const bounce = client.bounce()
  bounce.setServerComposition('sandbox')
  bounce.setStartDate(new Date(2020, 5, 17))
  bounce.setLimit(100)
  const res = await bounce.list()
  console.log(res)
})()
