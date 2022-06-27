const express = require('express')
const bodyParser = require("body-parser")
const cors = require('cors')
const Connect = require('./util/database')
const table = require('./util/table')
const ranking = require('./util/ranking')
const chatPix = require('./util/chatPix')
const { getDonates, getWallet } = require('./util/livepix')
const { getWalletValandil } = require('./util/livepix_valandiil')

const connect = new Connect

const app = express();

var corsOptions = {
  origin: 'https://widget-livestream.valandil.repl.co',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(express.static(__dirname + '/public'))
app.all('/', async (req, res) => {
  res.send('<h3>BOT OK</h3>')
})

app.all('/cassino', async (req, res) => {
  const cassinoList = await connect.show('cassino_list')
  res.send(table({ itens: cassinoList }))
})

app.post('/livepix', async (req, res) => {
  const donates = await getDonates(1)

  await chatPix({ data: donates.data[0]})

  res.status(200)
})

app.get('/meta-wig', cors(corsOptions), async (req, res) => {
  const meta = await getWallet()

  res.json(meta)
})

app.get('/meta-valandiil', cors(corsOptions), async (req, res) => {
  const meta = await getWalletValandil()

  res.json(meta)
})

app.all('/ranking', async (req, res) => {
  const donates = await getDonates(100)

  res.send(ranking({ itens: donates.data }))
})

app.use(bodyParser.json({ extended: true }))

function keepAlive() {
  app.listen(3000, () => {
    console.log("Server is ready.")
  })
}

module.exports = keepAlive