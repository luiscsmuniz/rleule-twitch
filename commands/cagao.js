const cagao = require('../data/cagao.json')
const Connect = require('../util/database')

const connect = new Connect

module.exports = {
  name: "cagao",
  cooldown: 2,
  async execute(client, channel, tags) {
    if (!cagao.enableCommand) return

    const count = await connect.show('count_cagao') || 0

    const newCount = count + 1

    await connect.insert('count_cagao', newCount)
    
    return client.say(
      channel,
      cagao.phrase
        .replace(':count', newCount)
    )
  }
};
