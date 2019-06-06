import { fetchJSON } from './fetchJSON'

class PantryIngredients {
    

    constructor(BASE_URL) {
        this.BASE_PANTRY_URL = `${BASE_URL}/pantryingredients` 
    }

    getList(access_token, suggestion = null) {
        let uri = this.BASE_PANTRY_URL
        if(suggestion != null ) 
            uri += `?suggestion=${suggestion}`
    
        const options = {
            method: 'GET',
            headers: {
                'Authorization':'Bearer ' + access_token
            }
        }
        return fetchJSON(uri, options)
    }
    
    getListToAdd(access_token, missing = true) {
        let uri = `${this.BASE_PANTRY_URL}?missing=${missing}`
        const options = {
            method: 'GET',
            headers: {
                'Authorization':'Bearer '+access_token
            }
        }
        return fetchJSON(uri, options)
    }
    
    post(access_token, ingredient) {
        const options = {
            method: 'POST',
            body: JSON.stringify({ 
                  id:ingredient.id,
                  quantity:ingredient.quantity
                } 
            ),
            headers: { 
                'Authorization': 'Bearer ' + access_token, 
                'Content-Type': 'application/json' 
            }
        }
        return fetchJSON(this.BASE_PANTRY_URL, options)
    }
    
    put(access_token, ingredient) {
        const options = {
            method: 'PUT',
            body: JSON.stringify({
                  id:ingredient.id,
                  quantity:ingredient.quantity
                } 
            ),
            headers: { 
                'Authorization': 'Bearer ' + access_token, 
                'Content-Type': 'application/json' 
            }
        }
        return fetchJSON(this.BASE_PANTRY_URL, options)
    }
    
    delete(access_token, id) {
        const options = {
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + access_token }
        }
        return fetchJSON(`${this.BASE_PANTRY_URL}/${id}`, options)
    }

    patchDiscountQuantities(ingredients, access_token) {
        const options = {
            body: JSON.stringify({
                'Operation': 'discountQuantities',
                'DiscountQuantityList': { 'ingredients': ingredients }
            }),
            method: 'PATCH',
            headers: { 
                'Authorization': 'Bearer ' + access_token,
                'Access-Control-Request-Headers': 'content-type',
                'Content-Type': 'application/json'
            }
        }
        return fetchJSON(this.BASE_PANTRY_URL, options)
    }
}

export default PantryIngredients