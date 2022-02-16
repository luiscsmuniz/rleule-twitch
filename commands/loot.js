const lootUser = require('../data/loot.json')

const sort = () => {
  const { maxRange, minRange, loot } = lootUser
  const x = Math.floor(Math.random() * (maxRange - minRange) + minRange)

  return loot.find(obj => obj.range[0] <= x && obj.range[1] >= x )
} 

module.exports = {
  name: "loot",
  cooldown: 2,
  execute(client, channel, tags) {
    if (!lootUser.enableCommand) return

    return client.say(
      channel,
      lootUser.phrase
        .replace(':user', tags['display-name'])
        .replace(':item', sort().item)
    )
  }
};
