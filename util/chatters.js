const fetch = require('node-fetch')

const randomChatter = async () => {
  const response = await fetch('https://tmi.twitch.tv/group/user/wig1/chatters')
  const data = await response.json()

  const { chatters: { viewers, broadcaster, moderators, vips } } = data

  const users = [
    ...viewers,
    ...broadcaster,
    ...moderators,
    ...vips,
  ]

  return users[Math.floor(Math.random()*users.length)]
}

module.exports = randomChatter
