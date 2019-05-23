import fetchJSON from './fetchJSON'

const SCHEME_AUTHORITY = 'http://35.204.230.227' //http://localhost:61549'//'http://pantrycook.westeurope.cloudapp.azure.com' 
const BASE_URL = `${SCHEME_AUTHORITY}/api` 
const BASE_PANTRY_URL = `${BASE_URL}/pantryingredients` 

const pantryIngredients = {

    getList: (access_token, suggestion = null, missing = null) => {
        let uri = BASE_PANTRY_URL
        if(suggestion != null ) uri += `?suggestion=${suggestion}`
        if(missing != null ) uri += `&missing=${missing}` //todo
    
        const options = {
            method: 'GET',
            headers: {
                'Authorization':'Bearer '+access_token
            }
        }
        return fetchJSON(uri,options)
    },
    
    getListToAdd: (access_token, missing = true) => {
        let uri = `${BASE_PANTRY_URL}?missing=${missing}`
        const options = {
            method: 'GET',
            headers: {
                'Authorization':'Bearer '+access_token
            }
        }
        return fetchJSON(uri,options)
    },
    
    post: (access_token, ingredient) => {
        const options = {
            method: 'POST',
            body: JSON.stringify({ //ingredient = { id:..., quantity:... }
                  id:ingredient.id,
                  quantity:ingredient.quantity
                } 
            ),
            headers: { 
                'Authorization': 'Bearer ' + access_token, 
                'Content-Type': 'application/json' 
            }
        }
        return fetchJSON(BASE_PANTRY_URL, options)
    },
    
    put: (access_token, ingredient) => {
        const options = {
            method: 'PUT',
            body: JSON.stringify({ //ingredient = { id:..., quantity:... }
                  id:ingredient.id,
                  quantity:ingredient.quantity
                } 
            ),
            headers: { 
                'Authorization': 'Bearer ' + access_token, 
                'Content-Type': 'application/json' 
            }
        }
        return fetchJSON(BASE_PANTRY_URL, options)
    },
    
    delete: (access_token, id) => {
        const options = {
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + access_token }
        }
        return fetchJSON(`${BASE_PANTRY_URL}/${id}`, options)
    },

    patchDiscountQuantities: (ingredients, access_token) => {
        const options = {
            body: JSON.stringify({
                'Operation': 'discountQuantities',
                'DiscountQuantityList': { 'ingredients': ingredients } //ingredients = [ { id:..., quantity:... }, ... ]
            }),
            method: 'PATCH',
            headers: { 
                'Authorization': 'Bearer ' + access_token,
                'Access-Control-Request-Headers': 'content-type',
                'Content-Type': 'application/json'
            }
        }
        return fetchJSON(BASE_PANTRY_URL, options)
    }
}

export default pantryIngredients