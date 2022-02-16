const peru = require('../data/peru.json')

const sort = () => {
  const { max, min } = peru
  const x = Math.floor(Math.random() * (max - min) + min)

  return x
} 

module.exports = {
  name: "peru",
  cooldown: 2,
  execute(client, channel, tags) {
    if (!peru.enableCommand) return

    return client.say(
      channel,
      peru.phrase
        .replace(':user', tags['display-name'])
        .replace(':tamanho', sort())
    )
  }
};
