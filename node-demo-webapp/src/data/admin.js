import { fetchJSON } from './fetchJSON'

class Admin {

    constructor(BASE_URL) {
        this.BASE_URL = `${BASE_URL}` 
    }
    
    getRecipes(access_token) {
        const options = {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${access_token}` }
        }
        return fetchJSON(`${this.BASE_URL}/recipes/all`, options)
    }

    postRecipe(access_token, recipe) {
        const options = {
            method: 'POST',
            body: JSON.stringify(recipe),
            headers: { 
                'Authorization': `Bearer ${access_token}`, 
                'Content-Type': 'application/json'
            }
        }
        return fetchJSON(`${this.BASE_URL}/recipes`, options)
    }

    deleteRecipe(access_token, id) {
        const options = {
            method: 'DELETE',
            headers: { 
                'Authorization': `Bearer ${access_token}`, 
                'Content-Type': 'application/json'
            }
        }
        return fetchJSON(`${this.BASE_URL}/recipes/${id}`, options)
    }

    getRandomMealDbRecipe(access_token) {
        const options = {
            headers: { 
                method: 'GET',
                'Authorization': `Bearer ${access_token}`
            }
        }
        return fetchJSON(`${this.BASE_URL}/recipes/random`, options)
    }
}

export default Admin