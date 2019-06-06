const KEY_ACCESS_TOKEN = 'access_token'
const KEY_EXPIRE_DATE = 'expire_date'
const KEY_REFRESH_TOKEN = 'refresh_token'

//https://github.com/softvar/secure-ls ver mais tarde para encriptar dados no Local Storage

export default {
    isAuthenticated,
    saveTokens,
    saveItem,
    deleteTokens,
    getItem,
    getAccessToken
}

export function isAuthenticated() {
    return localStorage.getItem(KEY_REFRESH_TOKEN)
}

function saveTokens(tokens) {
    localStorage.setItem(KEY_ACCESS_TOKEN, tokens.access_token)
    localStorage.setItem(KEY_EXPIRE_DATE, new Date(new Date().getTime() + tokens.expires_in*1000).getTime())
    localStorage.setItem(KEY_REFRESH_TOKEN, tokens.refresh_token)
}

function saveItem(key, value) {
    localStorage.setItem(key, value)
}

function deleteTokens() {
    localStorage.clear()
    localStorage.clear()
}

function getTokens() {
    return {
        accessToken: localStorage.getItem(KEY_ACCESS_TOKEN),
        expireDate: localStorage.getItem(KEY_EXPIRE_DATE),
        refreshToken: localStorage.getItem(KEY_REFRESH_TOKEN)
    }
}

export function getItem(key) {
    localStorage.getItem(key)
}

function getAccessToken(refreshToken) {
  const tokens = getTokens()
  if (tokens.accessToken && Date.now() <= tokens.expireDate) {
      return Promise.resolve(tokens.accessToken)
  }
  return refreshToken(tokens.refreshToken)
    .then(res => {
        saveTokens(res)
        return res.access_token
    })
    .catch(err => { throw err }) 
}