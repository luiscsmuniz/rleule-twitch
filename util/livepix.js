const fetch = require('node-fetch')

const endpoints = {
  getMessages: 'https://api.livepix.gg/v1/messages?limit=:limit&page=:page',
  getWallet: 'https://api.livepix.gg/v1/wallet',
  createWebhook: '',
}

const generateToken = async (scope) => {
  const url = 'https://oauth.livepix.gg/oauth2/token'
  const body = new URLSearchParams();
  body.append("client_id", process.env.LIVEPIX_ID);
  body.append("client_secret", process.env.LIVEPIX_SECRET);
  body.append("grant_type", "client_credentials");
  body.append("scope", scope);

  const response = await fetch(url, {
    method: 'POST',
    body,
  })

  const data = await response.json()

  return data
}

const getDonates = async (limit = null, page = null) => {
  const token = await generateToken('messages:read')

  const response = await fetch(endpoints.getMessages
                               .replace(':limit', limit)
                               .replace(':page', page), {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
    }
  })

  const data = await response.json()

  return data
}

const getWallet = async () => {
  const token = await generateToken('wallet:read')

  const response = await fetch(endpoints.getWallet, {
    headers: {
      Authorization: `Bearer ${token.access_token}`,
    }
  })

  const data = await response.json()

  return data
}

const getSubs = () => {}

module.exports = {
  generateToken,
  getDonates,
  getWallet,
  getSubs,
}
