const tmi = require('tmi.js');
const loot = require('./commands/loot')
const BOTNAME = 'Rleule'
const CHANNELS = ['Valandiil', 'Wig1']
const TOKEN = 'oauth:7x2ij09h34vdy6p6wlhuzonictbg02'

const opts = {
  identity: {
    username: BOTNAME,
    password: TOKEN,
  },
  channels: CHANNELS,
}
const client = new tmi.client(opts);

client.connect();

client.on('message', (channel, tags, message, self) => {
	if(self) return;

  const command = message.toLowerCase()

	if(command === '!loot') {
		return loot(client, channel, tags.username)
	}
});