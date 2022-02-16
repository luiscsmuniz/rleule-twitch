const tmi = require('tmi.js');
const { readdirSync } = require("fs");
const { join } = require("path");
const loot = require('./commands/loot')
const BOTNAME = 'wig1bot'
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
let cooldowns = []

const commandFiles = readdirSync(join(__dirname, "commands")).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(join(__dirname, "commands", `${file}`));
  commands.push(command);
  cooldowns.push({
    command: command.name,
    cooldown: command.cooldown || 0,
    timestamp: Date.now(),
  })
}

client.connect();

client.on('message', async (channel, tags, message, self) => {

	if(self) return;
  try {
    const regexpCommand = new RegExp(/^!([a-zA-Z0-9]+)(?:\W+)?(.*)?/);
    const [raw, commandName, argument] = message.match(regexpCommand);

    const cdCommand = cooldowns.find(item => item.command === commandName)

    const timestamp = new Date(cdCommand.timestamp)

    if (timestamp.setSeconds(timestamp.getSeconds() + cdCommand.cooldown) <= Date.now()) {
      const index = cooldowns.findIndex(item => item.command === cdCommand.command)

      cooldowns[index].timestamp = Date.now()

      const command = commands.find(item => item.name === commandName)
      command.execute(client, channel, tags, argument);
    }
  } catch (error){
    console.log(error)
  }
});