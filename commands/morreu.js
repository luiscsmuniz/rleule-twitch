const morreu = require('../data/morreu.json')
const Connect = require('../util/database')

const connect = new Connect

module.exports = {
  name: "morreu",
  cooldown: 2,
  async execute(client, channel, tags) {
    if (!morreu.enableCommand) return

    const count = await connect.show('count_morreu') || 0

    const newCount = count + 1

    await connect.insert('count_morreu', newCount)
    
    return client.say(
      channel,
      morreu.phrase
        .replace(':count', newCount)
    )
  }
};
