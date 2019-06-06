import { fetchJSON } from './fetchJSON'

class Ingredients {

    constructor(BASE_URL) {
        this.BASE_CATEGORIES_URL = `${BASE_URL}/ingredients`
    }

    getList(suggestion) {
        let uri = `${this.BASE_CATEGORIES_URL}?suggestion=${suggestion}`
        return fetchJSON(uri)
    }
}

export default Ingredients