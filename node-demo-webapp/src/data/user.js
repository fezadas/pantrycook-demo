import { fetchJSON } from './fetchJSON'

class User {

    constructor(BASE_URL) {
        this.BASE_URL = `${BASE_URL}/users` 
    }

    get(access_token) {
        const options = {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${access_token}` }
        }
        return fetchJSON(`${this.BASE_URL}`,options)
    }
    
    changePassword(access_token,credentials){
        const options = {
            method: 'PUT',
            body: JSON.stringify({ CurrentPassword: credentials.currentpassword, NewPassword:credentials.newpassword}),
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${access_token}` }
        }
        return fetchJSON(`${this.BASE_URL}`,options)
    }
}

export default User