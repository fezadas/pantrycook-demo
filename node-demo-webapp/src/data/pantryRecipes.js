import fetchJSON from './fetchJSON'

const SCHEME_AUTHORITY = 'http://35.204.230.227' //http://localhost:61549'//'http://pantrycook.westeurope.cloudapp.azure.com' 
const BASE_URL = `${SCHEME_AUTHORITY}/api` 
const BASE_PANTRY_RECIPES_URL = `${BASE_URL}/pantryrecipes`

const pantryRecipes = {
    get: (id, access_token) => {
        const options = {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + access_token }
        }
        return fetchJSON(`${BASE_PANTRY_RECIPES_URL}/${id}`, options)
    },
    
    getPage: (query, ingredients, access_token) => {
        let options = {}
        console.log(ingredients)
        if(ingredients)
            options = {
                method: 'POST',
                body: JSON.stringify({ ingredients }),
                headers: { 
                    'Authorization': 'Bearer ' + access_token, 
                    'Content-Type': 'application/json',
                    'Accept': 'application/hal+json' 
                }
            }
        else
            options = {
                method: 'GET',
                headers: { 
                    'Authorization': 'Bearer ' + access_token, 
                    'Accept': 'application/hal+json' 
                }
            }
            console.log(options)
        return fetchJSON(`${BASE_PANTRY_RECIPES_URL}?${query}`, options)
    },
    
    getPageByUri: (path, ingredients, access_token) => {
        let options = {}
        if(ingredients)
            options = {
                method: 'POST',
                body: JSON.stringify({ ingredients }),
                headers: { 
                    'Authorization': 'Bearer ' + access_token, 
                    'Content-Type': 'application/json',
                    'Accept': 'application/hal+json' 
                }
            }
        else
            options = {
                method: 'GET',
                headers: { 
                    'Authorization': 'Bearer ' + access_token, 
                    'Accept': 'application/hal+json' 
                }
            }
        return fetchJSON(`${SCHEME_AUTHORITY}${path}`, options)
    }
}

export default pantryRecipes