const pix = require('../data/pix.json')

module.exports = {
  name: "pix",
  cooldown: 2,
  execute(client, channel, tags) {
    if (!pix.enableCommand) return

    return client.say(
      channel,
      pix.command
    )
  }
};
