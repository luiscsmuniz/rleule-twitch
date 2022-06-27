const fetch = require('node-fetch')
const generateToken = require('./generateToken')

const getUser = async (name) => {
  const Authorization = await generateToken()
  const response = await fetch(`https://api.twitch.tv/helix/users?login=${name}`, {
    method: 'GET',
    headers: {
      'Client-Id': process.env.TWITCH_APP_ID,
      Authorization: `Bearer ${Authorization.access_token}`,
      'Content-Type': 'application/json'
    }
  })

  const data = await response.json()

  return data
}

module.exports = getUser
