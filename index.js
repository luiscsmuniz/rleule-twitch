const tmi = require('tmi.js');
const { readdirSync } = require("fs");
const { join } = require("path");
const cron = require('node-cron')
const BOTNAME = 'wig1bot'
const CHANNELS = ['Valandiil', 'Wig1']
const TOKEN = process.env.TOKEN
const keepAlive = require('./server')
const announcements = require('./data/announcements')
const live = require('./util/live')
const { generateToken } = require('./util/livepix')

const opts = {
  identity: {
    username: BOTNAME,
    password: TOKEN,
  },
  channels: CHANNELS,
}

const client = new tmi.client(opts);

announcements.forEach(announce => {
  cron.schedule(announce.cron, async () => {
    if (announce.enabled && !!await live()) {
      client.say('Wig1', announce.text)
    }
  }, {
    scheduled: true,
    timezone: "America/Sao_Paulo"
  });
})

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

client.on("chat", async (channel, userstate, message, self) => {
  if (self) return null

  if (userstate['custom-reward-id'] === '8130400e-d030-4e11-95d6-5b303702a41f') {
    client.say(channel, "/timeout :user 60s"
      .replace(':user', message)
    )
  }
})

client.on("subscription", async (channel, username, method, message, userstate) => {
  console.log({ channel, username, method, message, userstate })
  client.say(channel, ":user, obrigado pelo sub wig1Hype"
    .replace(':user', username)
  )
})

client.on("cheer", async (channel, tags, message, self) => {
  client.say(channel, ":user, obrigado pelos :bits bits wig1Hype"
    .replace(':user', tags['display-name'])
    .replace(':bits', tags.bits))
})

client.on('redeem', (channel, username, rewardType, tags, message) => {
  console.log({ channel, username, rewardType, tags, message })
})

client.on("resub", async (channel, username, method, message, userstate) => {
  console.log({ channel, username, method, message, userstate })
	const streakMonths = userstate['msg-param-streak-months'];
	const cumulativeMonths = userstate['msg-param-cumulative-months'];
	const sharedStreak = userstate['msg-param-should-share-streak'];
	if(sharedStreak) {
		return client.say(
      channel,
      `:user, obrigado pela inscrição de :streakMonths meses consecutivos wig1Hype`
        .replace(':user', username)
        .replace(':streakMonths', streakMonths))
	}

	return client.say(
    channel,
    `:user, obrigado pela inscrição de :cumulativeMonths meses wig1Hype`
      .replace(':user', username)
      .replace(':cumulativeMonths', cumulativeMonths))
})

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
      // if (!await live()) return
      command.execute(client, channel, tags, argument);
    }
  } catch (error){
    // console.log(error)
  }
});

keepAlive()