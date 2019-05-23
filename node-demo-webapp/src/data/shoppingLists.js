import fetchJSON from './fetchJSON'

const SCHEME_AUTHORITY = 'http://35.204.230.227' //http://localhost:61549'//'http://pantrycook.westeurope.cloudapp.azure.com' 
const BASE_URL = `${SCHEME_AUTHORITY}/api` 
const BASE_SHOPPING_LIST_URL = `${BASE_URL}/shoppinglists`

const shoppingLists = {

    get: (id, access_token) => {
        const options = {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + access_token }
        }
        return fetchJSON(`${BASE_SHOPPING_LIST_URL}/${id}`, options)
    },

    getAll: (access_token) => {
        const options = {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + access_token }
        }
        return fetchJSON(BASE_SHOPPING_LIST_URL, options)
    },
    
    post: (shoppingList, access_token) => {
        const options = {
            method: 'POST',
            body: JSON.stringify(shoppingList),
            headers: { 
                'Authorization': 'Bearer ' + access_token, 
                'Content-Type': 'application/json' 
            }
        }
        return fetchJSON(BASE_SHOPPING_LIST_URL, options)
    },

    put: (id, shoppingList, access_token) => {
        const options = {
            method: 'PUT',
            body: JSON.stringify(shoppingList),
            headers: { 
                'Authorization': 'Bearer ' + access_token, 
                'Content-Type': 'application/json' 
            }
        }
        return fetchJSON(`${BASE_SHOPPING_LIST_URL}/${id}`, options)
    },

    delete: (id, access_token) => {
        const options = {
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + access_token }
        }
        return fetchJSON(`${BASE_SHOPPING_LIST_URL}/${id}`, options)
    },

    patch: (id, actionBody, access_token) => {
        const options = {
            method: 'PATCH',
            body: JSON.stringify(actionBody),
            headers: { 
                'Authorization': 'Bearer ' + access_token, 
                'Content-Type': 'application/json' 
            }
        }
        return fetchJSON(`${BASE_SHOPPING_LIST_URL}/${id}`, options)
    }
}

export default shoppingLists