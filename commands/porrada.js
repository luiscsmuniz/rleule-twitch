const porrada = require('../data/porrada.json')
const randomChatter = require('../util/chatters')

module.exports = {
  name: "porrada",
  cooldown: 2,
  async execute(client, channel, tags) {
    if (!porrada.enableCommand) return

    const random = await randomChatter()
    return client.say(
      channel,
      porrada.phrase
        .replace(':user', tags['display-name'])
        .replace(':random', random)
    )
  }
};
