const data = require('../data/cassino.json')

module.exports = {
  name: "cassino",
  execute(client, channel, tags) {
    const arrEmote = data.cassino.emotes
    const firstEmote = arrEmote[Math.floor(Math.random() * arrEmote.length)];
    const secondEmote = arrEmote[Math.floor(Math.random() * arrEmote.length)];
    const thirdEmote = arrEmote[Math.floor(Math.random() * arrEmote.length)];

    client.say(channel, `@${tags['display-name']} Seus emotes sorteados: ${firstEmote} ${secondEmote} ${thirdEmote} `);

    const obj = data.cassino.timeout.find(item => item.firstEmote === firstEmote 
    && item.secondEmote === secondEmote
    && item.thirdEmote === thirdEmote)

    if (obj) client.say(channel, `/timeout ${tags['display-name']} ${obj.time}`);
  }
};
