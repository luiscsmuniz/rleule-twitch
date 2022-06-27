const TwitchApi = require('node-twitch').default

const twitch = new TwitchApi({
  client_id: process.env.TWITCH_APP_ID,
  client_secret: process.env.TWITCH_APP_SECRET,
});

const live = async () => {
  const streams = await twitch.getStreams({ channel: "Wig1" })

  if (streams.data[0]) {
    const data = streams.data[0]

    return data
  }

  return null
}

module.exports = live
