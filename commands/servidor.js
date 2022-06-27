module.exports = {
  name: "servidor",
  cooldown: 2,
  execute(client, channel, tags) {
    if (!tags.mod) return

    return client.say(
      channel,
      '/me Discord do server de V RISING: https://discord.gg/yoda'
    )
  }
};
