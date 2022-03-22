const data = require('../data/cassino.json')
const Connect = require('../util/database')

const connect = new Connect


module.exports = {
  name: "cassino",
  cooldown: 2,
  async execute(client, channel, tags) {
    const arrEmote = data.cassino.emotes
    const firstEmote = arrEmote[Math.floor(Math.random() * arrEmote.length)];
    const secondEmote = arrEmote[Math.floor(Math.random() * arrEmote.length)];
    const thirdEmote = arrEmote[Math.floor(Math.random() * arrEmote.length)];

    client.say(channel, `@${tags['display-name']} Seus emotes sorteados: ${firstEmote} ${secondEmote} ${thirdEmote} `);

    const obj = data.cassino.award.find(item => item.emote[0] === firstEmote 
    && item.emote[1] === secondEmote
    && item.emote[2] === thirdEmote)

    if (obj) {
      const cassinoList = await connect.show('cassino_list') || []
      client.say(channel, obj.command.replace(':user', tags['display-name']))
      client.say(channel, 'Confira a lista de campeões do cassino em: https://wig1bot.valandil.repl.co/cassino')

      await connect.insert('cassino_list', [...cassinoList, { name: tags['display-name']}])
    }
  }
};
