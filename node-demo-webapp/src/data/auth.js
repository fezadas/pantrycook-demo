import { fetchJSON } from './fetchJSON'

class Auth {

    constructor(BASE_URL) {
        this.TOKEN_URL = `${BASE_URL}/token`
        this.USERS_URL = `${BASE_URL}/users` 
    }
    
    getTokens(username, password) {
        const options = {
            method: 'POST',
            body: `grant_type=password&username=${username}&password=${password}`,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }
        return fetchJSON(this.TOKEN_URL, options)
    }

    refreshToken(refreshToken) {        
        const options = {
            method: 'POST',
            body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
            headers: { 
                'Content-Type': 'application/x-www-form-urlencoded',
                'Access-Control-Allow-Origin': ["*"]
            }            
        }
        return fetchJSON(this.TOKEN_URL, options)
    }

    createUser(username, name, password) {
        const options = {
            method: 'POST',
            body: JSON.stringify({ login: username, name, password }),
            headers: { 'Content-Type': 'application/json' }
        }
        return fetchJSON(this.USERS_URL, options)
    }
}

export default Auth