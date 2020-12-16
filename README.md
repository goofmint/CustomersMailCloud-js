# Customers Mail Cloud for Node.js

## Install

`npm i customers-mail-cloud`

## Usage

### Init

```js
const client = new CustomersMailCloud(api_user, api_key)
```

### Send mail

```js
const res = await client
  .trial()
  .setFrom(config.from.name, config.from.address)
  .addTo(config.to.name, config.to.address)
  .setSubject('テストメール')
  .setText('これはNode.jsライブラリから送信されたテストメールです')
  .addAttachments('./test.png')
  .addAttachments('./package.json')
  .send()
```

## Licese

MIT

