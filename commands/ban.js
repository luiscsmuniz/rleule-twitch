const randomChatter = require('../util/chatters')

module.exports = {
  name: "ban",
  cooldown: 2,
  async execute(client, channel, tags, args) {
    const secondUser = args ? args.split(' ') : null
    const random = await randomChatter()
    return client.say(
      channel,
      ":user baniu :random permanentemente"
        .replace(':user', tags['display-name'])
        .replace(':random', secondUser
                 ? secondUser[0]
                 : random)
    )
  }
};
