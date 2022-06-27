const fetch = require('node-fetch')

const generateToken = async () => {
  var requestOptions = {
    method: 'POST',
    redirect: 'follow',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
  const response = await fetch(
    `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_APP_ID}&client_secret=${process.env.TWITCH_APP_SECRET}&grant_type=client_credentials`,
    requestOptions
  )

  const data = await response.json()

  return data
}

module.exports = generateToken
