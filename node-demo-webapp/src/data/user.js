import { fetchJSON } from './fetchJSON'

class User {

    constructor(BASE_URL) {
        this.BASE_RECIPES_URL = `${BASE_URL}/users` 
    }

    get(access_token) {
        const options = {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${access_token}` }
        }
        return fetchJSON(`${this.BASE_RECIPES_URL}`,options)
    }
}

export default User