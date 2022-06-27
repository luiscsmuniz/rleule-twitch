const fetch = require('node-fetch')
const generateToken = require('./generateToken')
const getUser = require('./getUser')

const createClip = async () => {
  const Authorization = await generateToken()
  const broadcaster = await getUser('valandiil')
  const headers = {
    'Client-Id': process.env.TWITCH_APP_ID,
    Authorization: `Bearer ${Authorization.access_token}`,
    'Content-Type': 'application/json'
  }
  
  const response = await fetch(`https://api.twitch.tv/helix/clips?broadcaster_id=${broadcaster.data[0].id}`, {
    method: 'POST',
    headers,
  })

  const data = await response.json()

  return data
}

module.exports = createClip
