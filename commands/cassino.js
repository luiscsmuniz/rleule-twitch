const data = require('../data/cassino.json')

module.exports = {
  name: "cassino",
  cooldown: 2,
  execute(client, channel, tags) {
    const arrEmote = data.cassino.emotes
    const firstEmote = arrEmote[Math.floor(Math.random() * arrEmote.length)];
    const secondEmote = arrEmote[Math.floor(Math.random() * arrEmote.length)];
    const thirdEmote = arrEmote[Math.floor(Math.random() * arrEmote.length)];

    client.say(channel, `@${tags['display-name']} Seus emotes sorteados: ${firstEmote} ${secondEmote} ${thirdEmote} `);

    const obj = data.cassino.award.find(item => item.emote[0] === firstEmote 
    && item.emote[1] === secondEmote
    && item.emote[2] === thirdEmote)

    if (obj) client.say(channel, obj.command.replace(':user', tags['display-name']));
  }
};
