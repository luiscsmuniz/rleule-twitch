const tiktok = require('../data/tiktok.json')

module.exports = {
  name: "tiktok",
  cooldown: 2,
  execute(client, channel, tags) {
    if (!tiktok.enableCommand) return

    return client.say(
      channel,
      tiktok.command
    )
  }
};
