const tmi = require('tmi.js');
const { readdirSync } = require("fs");
const { join } = require("path");
const loot = require('./commands/loot')
const BOTNAME = 'Rleule'
const CHANNELS = ['Valandiil', 'Wig1']
const TOKEN = process.env.TOKEN

const opts = {
  identity: {
    username: BOTNAME,
    password: TOKEN,
  },
  channels: CHANNELS,
}

const client = new tmi.client(opts);

const commands = []

const commandFiles = readdirSync(join(__dirname, "commands")).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(join(__dirname, "commands", `${file}`));
  commands.push(command);
}

client.connect();

client.on('message', async (channel, tags, message, self) => {

	if(self) return;
  const regexpCommand = new RegExp(/^!([a-zA-Z0-9]+)(?:\W+)?(.*)?/);
  const [raw, commandName, argument] = message.match(regexpCommand);

  const command = commands.find(item => item.name === commandName)

  try {
    command.execute(client, channel, tags, argument);
  } catch (error) {
    console.error(error);
  }
});