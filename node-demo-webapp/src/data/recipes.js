import { fetchJSON } from './fetchJSON'

class Recipes {

    constructor(BASE_URL) {
        this.BASE_RECIPES_URL = `${BASE_URL}/recipes` 
    }

    getRandomList(random = null) {
        let uri = random ? `${this.BASE_RECIPES_URL}?random=${random}` : this.BASE_RECIPES_URL
        return fetchJSON(uri)
    }
    
    get(id) {
        return fetchJSON(`${this.BASE_RECIPES_URL}/${id}`)
    }
}

export default Recipes