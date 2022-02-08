const lootUser = require('../data/loot.json')

module.exports = {
  name: "loot",
  execute(client, channel, tags) {
    return client.say(channel, `${tags.username}, você achou um baú do tesouro! :moneybag: Você acaba de encontrar: ${lootUser.loot[Math.floor(Math.random()*lootUser.loot.length)]}`)
  }
};
