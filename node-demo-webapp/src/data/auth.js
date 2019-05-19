import fetchJSON from './fetchJSON'

const SCHEME_AUTHORITY = 'http://pantrycook.westeurope.cloudapp.azure.com'//'http://localhost:61549' 
const BASE_URL = `${SCHEME_AUTHORITY}/api` 
const USERS_URL = `${BASE_URL}/users` 

const auth = {
    getTokens: (username, password) => {
        const options = {
            method: 'POST',
            body: `grant_type=password&username=${username}&password=${password}`,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }
        return fetchJSON(`${BASE_URL}/token`, options)
    },

    refreshToken: (refreshToken) => {
        const options = {
            method: 'POST',
            body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }
        return fetchJSON(`${BASE_URL}/token`, options)
    },

    createUser: (username, name, password) => {
        const options = {
            method: 'POST',
            body: JSON.stringify({ login: username, name, password }),
            headers: { 'Content-Type': 'application/json' }
        }
        return fetchJSON(USERS_URL, options)
    }
}

export default auth