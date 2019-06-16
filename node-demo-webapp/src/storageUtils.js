import CryptoJS from 'crypto-js'

const password = 'default'

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
    
    var encrToken = localStorage.getItem(KEY_REFRESH_TOKEN)
    if(!encrToken) return null
    return decryptToken(encrToken)
    /*
    const rToken = localStorage.getItem(KEY_REFRESH_TOKEN)
    return rToken == undefined || rToken == null ? false : true
    */
}

function saveTokens(tokens) {
    localStorage.setItem(KEY_ACCESS_TOKEN, encryptToken(tokens.access_token))
    localStorage.setItem(KEY_EXPIRE_DATE, new Date(new Date().getTime() + tokens.expires_in*1000).getTime())
    localStorage.setItem(KEY_REFRESH_TOKEN, encryptToken(tokens.refresh_token))
}

function saveItem(key, value) {
    localStorage.setItem(key, value)
}

function deleteTokens() {
    localStorage.clear()
    localStorage.clear()
}

function getTokens() {
    var accessToken = decryptToken(localStorage.getItem(KEY_ACCESS_TOKEN))
    var refreshToken = decryptToken(localStorage.getItem(KEY_REFRESH_TOKEN))
    return {
        accessToken: accessToken,
        expireDate: localStorage.getItem(KEY_EXPIRE_DATE),
        refreshToken:refreshToken
    }    
}

export function getItem(key) {
    localStorage.getItem(key)
}

function getAccessToken(refreshToken) {
  const tokens = getTokens()
  if (tokens.accessToken && Date.now() + 10000 <= tokens.expireDate) {
      return Promise.resolve(tokens.accessToken)
  }
  return refreshToken(tokens.refreshToken)
    .then(res => {
        saveTokens(res)
        return res.access_token
    })
    .catch(err => { throw err }) 
}

function encryptToken(token){
    return CryptoJS.AES.encrypt(token, password);
}

function decryptToken(token){
    var decryptedBytes = CryptoJS.AES.decrypt(token,password)
    return decryptedBytes.toString(CryptoJS.enc.Utf8);
}