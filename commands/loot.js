const lootUser = require('../data/loot.json')

const loot = async (client, channel, username) => {
  console.log(lootUser)
  
  return client.say(channel, `${username}, você achou um baú do tesouro! :moneybag: Você acaba de encontrar: ${lootUser.loot[Math.floor(Math.random()*lootUser.loot.length)]}`);
}

module.exports = loot