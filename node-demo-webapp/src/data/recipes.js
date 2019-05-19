import fetchJSON from './fetchJSON'

const SCHEME_AUTHORITY = 'http://pantrycook.westeurope.cloudapp.azure.com'//'http://localhost:61549' 
const BASE_URL = `${SCHEME_AUTHORITY}/api` 
const BASE_RECIPES_URL = `${BASE_URL}/recipes`

const recipes = {

    getRandomList: (random = null) => {
        let uri = random ? `${BASE_RECIPES_URL}?random=${random}` : this.BASE_RECIPES_URL
        return fetchJSON(uri)
    },
    
    get: (id) => {
        return fetchJSON(`${BASE_RECIPES_URL}/${id}`)
    }
}

export default recipes