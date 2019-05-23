import fetchJSON from './fetchJSON'

const SCHEME_AUTHORITY = 'http://35.204.230.227' //http://localhost:61549'//'http://pantrycook.westeurope.cloudapp.azure.com' 
const BASE_URL = `${SCHEME_AUTHORITY}/api` 
const BASE_CATEGORIES_URL = `${BASE_URL}/categories`

const categories = {

    getList: (suggestion) => {
        let uri = `${BASE_CATEGORIES_URL}?suggestion=${suggestion}`
        return fetchJSON(uri)
    }
}

export default categories