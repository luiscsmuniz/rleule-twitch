const ain = require('../data/ain.json')
const Connect = require('../util/database')

const connect = new Connect

module.exports = {
  name: "ain",
  cooldown: 2,
  async execute(client, channel, tags) {
    if (!ain.enableCommand) return

    const count = await connect.show('count_ain') || 0

    const newCount = count + 1

    await connect.insert('count_ain', newCount)
    
    return client.say(
      channel,
      ain.phrase
        .replace(':count', newCount)
    )
  }
};
