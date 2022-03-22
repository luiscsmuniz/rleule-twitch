const dr = require('../data/dr.json')
const Connect = require('../util/database')

const connect = new Connect

module.exports = {
  name: "dr",
  cooldown: 2,
  async execute(client, channel, tags) {
    if (!dr.enableCommand) return

    const count = await connect.show('count_dr') || 0

    const newCount = count + 1

    await connect.insert('count_dr', newCount)
    
    return client.say(
      channel,
      dr.phrase
        .replace(':count', newCount)
    )
  }
};
