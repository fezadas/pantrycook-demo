import { fetchJSON } from './fetchJSON'

class Categories {

    constructor(BASE_URL) {
        this.BASE_CATEGORIES_URL = `${BASE_URL}/categories`
    }

    getList(suggestion) {
        let uri = `${this.BASE_CATEGORIES_URL}?suggestion=${suggestion}`
        return fetchJSON(uri)
    }
}

export default Categories