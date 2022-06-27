const sim = require('../data/sim.json')

module.exports = {
  name: "sim",
  cooldown: 2,
  execute(client, channel, tags) {
    if (!sim.enableCommand) return

    return client.say(
      channel,
      sim.command
        .replace(':user', tags['display-name'])
    )
  }
};
