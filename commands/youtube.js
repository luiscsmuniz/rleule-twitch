const youtube = require('../data/youtube.json')

module.exports = {
  name: "youtube",
  cooldown: 2,
  execute(client, channel, tags) {
    if (!youtube.enableCommand) return

    return client.say(
      channel,
      youtube.command
    )
  }
};
