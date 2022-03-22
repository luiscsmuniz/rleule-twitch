const salgrosso = require('../data/salgrosso.json')
const Connect = require('../util/database')

const connect = new Connect

module.exports = {
  name: "salgrosso",
  cooldown: 2,
  async execute(client, channel, tags) {
    if (!salgrosso.enableCommand) return

    const count = await connect.show('count_salgrosso') || 0

    const newCount = count + 1

    await connect.insert('count_salgrosso', newCount)
    
    return client.say(
      channel,
      salgrosso.phrase
        .replace(':count', newCount)
    )
  }
};
