import { fetchJSON } from './fetchJSON'

class Admin {

    constructor(BASE_URL) {
        this.ADMIN_URL = `${BASE_URL}` 
    }
    
    getRecipes(access_token) {
        const options = {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${access_token}` }
        }
        return fetchJSON(`${this.ADMIN_URL}/recipes/all`, options)
    }

    postRecipes(username, password) {
        const options = {
            method: 'POST',
            body: `grant_type=password&username=${username}&password=${password}`,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }
        return fetchJSON(this.TOKEN_URL, options)
    }
}

export default Admin