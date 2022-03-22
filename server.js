const express = require('express')
const bodyParser = require("body-parser")
const Connect = require('./util/database')
const table = require('./util/table')

const connect = new Connect

const app = express();

app.use(express.static(__dirname + '/public'))
app.all('/', async (req, res) => {
  res.send('<h3>BOT OK</h3>')
})

app.all('/cassino', async (req, res) => {
  const cassinoList = await connect.show('cassino_list')
  res.send(table({ itens: cassinoList }))
})

app.use(bodyParser.json())

function keepAlive() {
  app.listen(3000, () => {
    console.log("Server is ready.")
  })
}

module.exports = keepAlive