import { fetchJSON } from './fetchJSON'

class PantryRecipes {

    constructor(SCHEME_AUTHORITY, BASE_URL) {
        this.SCHEME_AUTHORITY = SCHEME_AUTHORITY
        this.BASE_PANTRY_RECIPES_URL = `${BASE_URL}/pantryrecipes`
    }

    get(id, access_token) {
        const options = {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${access_token}` }
        }
        return fetchJSON(`${this.BASE_PANTRY_RECIPES_URL}/${id}`, options)
    }
    
    getPage(query, ingredients, access_token) {
        let options = {}
        if(ingredients)
            options = {
                method: 'POST',
                body: JSON.stringify({ ingredients }),
                headers: { 
                    'Authorization': `Bearer ${access_token}`, 
                    'Content-Type': 'application/json',
                    'Accept': 'application/hal+json' 
                }
            }
        else
            options = {
                method: 'GET',
                headers: { 
                    'Authorization': `Bearer ${access_token}`, 
                    'Accept': 'application/hal+json' 
                }
            }
        return fetchJSON(`${this.BASE_PANTRY_RECIPES_URL}?${query}`, options)
    }
    
    getPageByUri(path, ingredients, access_token) {
        let options = {}
        if(ingredients)
            options = {
                method: 'POST',
                body: JSON.stringify({ ingredients }),
                headers: { 
                    'Authorization': `Bearer ${access_token}`, 
                    'Content-Type': 'application/json',
                    'Accept': 'application/hal+json' 
                }
            }
        else
            options = {
                method: 'GET',
                headers: { 
                    'Authorization': `Bearer ${access_token}`, 
                    'Accept': 'application/hal+json' 
                }
            }
        return fetchJSON(`${this.SCHEME_AUTHORITY}${path}`, options)
    }
}

export default PantryRecipes