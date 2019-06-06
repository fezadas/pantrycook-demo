import { fetchJSON } from './fetchJSON'

class ShoppingLists {

    constructor(BASE_URL) {
        this.BASE_SHOPPING_LIST_URL = `${BASE_URL}/shoppinglists`
    }

    get(id, access_token) {
        const options = {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${access_token}` }
        }
        return fetchJSON(`${this.BASE_SHOPPING_LIST_URL}/${id}`, options)
    }

    getAll(access_token) {
        const options = {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${access_token}` }
        }
        return fetchJSON(this.BASE_SHOPPING_LIST_URL, options)
    }
    
    post(shoppingList, access_token) {
        const options = {
            method: 'POST',
            body: JSON.stringify(shoppingList),
            headers: { 
                'Authorization': `Bearer ${access_token}`, 
                'Content-Type': 'application/json' 
            }
        }
        return fetchJSON(this.BASE_SHOPPING_LIST_URL, options)
    }

    put(id, shoppingList, access_token) {
        const options = {
            method: 'PUT',
            body: JSON.stringify(shoppingList),
            headers: { 
                'Authorization': `Bearer ${access_token}`, 
                'Content-Type': 'application/json' 
            }
        }
        return fetchJSON(`${this.BASE_SHOPPING_LIST_URL}/${id}`, options)
    }

    delete(id, access_token) {
        const options = {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${access_token}` }
        }
        return fetchJSON(`${this.BASE_SHOPPING_LIST_URL}/${id}`, options)
    }

    patch(id, actionBody, access_token) {
        const options = {
            method: 'PATCH',
            body: JSON.stringify(actionBody),
            headers: { 
                'Authorization': `Bearer ${access_token}`, 
                'Content-Type': 'application/json' 
            }
        }
        return fetchJSON(`${this.BASE_SHOPPING_LIST_URL}/${id}`, options)
    }
}

export default ShoppingLists