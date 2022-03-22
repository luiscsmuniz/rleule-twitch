const { readdirSync } = require("fs");
const { join } = require("path");

module.exports = {
  name: "commands",
  execute(client, channel, tags) {
    const commands = []

    const commandFiles = readdirSync(join(__dirname, "../commands")).filter((file) => file.endsWith(".js"));
    for (const file of commandFiles) {
      const command = require(join(__dirname, "../commands", `${file}`));
      commands.push(command);
    }

    return client.say(channel, `/me @${tags['display-name']}, os comandos são: ${commands.filter(item => item.name !== 'commands').map(item => `!${item.name}`).join(', ')}`)
  }
};