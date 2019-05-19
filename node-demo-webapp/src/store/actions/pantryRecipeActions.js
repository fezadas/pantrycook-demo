import query_string from 'query-string'

export const FETCH_BEGIN = 'FETCH_BEGIN'
export const FETCH_ERROR = 'FETCH_ERROR'
export const FETCH_PANTRY_RECIPE_INFO_SUCCESS = 'FETCH_PANTRY_RECIPE_INFO_SUCCESS'
export const FETCH_RECIPES_PAGE_SUCCESS = 'FETCH_RECIPES_PAGE_SUCCESS'
export const FETCH_RECIPES_PAGE_BY_URI_SUCCESS = 'FETCH_RECIPES_PAGE_BY_URI_SUCCESS'

const fetchBegin = () => ({
    type: FETCH_BEGIN
})

const fetchFailure = error => ({
    type: FETCH_ERROR,
    payload: { error }
})

const fetchPantryRecipeInfoSuccess = recipeInfo => ({
    type: FETCH_PANTRY_RECIPE_INFO_SUCCESS,
    payload: { recipeInfo }
})

export function fetchPantryRecipeInfo(id) {
    return (dispatch, getState, { PantryCookApi }) => {
        dispatch(fetchBegin())
        const access_token = localStorage.getItem('access_token')
        PantryCookApi.pantryRecipes.get(id, access_token)
            .then(recipeInfo => {
                dispatch(fetchPantryRecipeInfoSuccess(recipeInfo))
            })
            .catch(error => {
                dispatch(fetchFailure(error))
            })
    }
}

const fetchRecipesPageSuccess = page => ({
    type: FETCH_RECIPES_PAGE_SUCCESS,
    payload: { page }
})

export function fetchRecipesPage(page, limit, category, ingredients) {
    return (dispatch, getState, { PantryCookApi }) => {
        if(ingredients)
            ingredients = ingredients.map(ing => ing.name)

        let query = {}
        if(category)
            query.category = category.name
        query.limit = limit
        if(page != 1)
            query.page = page
        query.limit = limit
        query = query_string.stringify(query).replace()
        query = query.replace(/%20/g, '+')
        
        dispatch(fetchBegin())
        const access_token = localStorage.getItem('access_token')
        
        PantryCookApi.pantryRecipes.getPage(query, ingredients, access_token)
            .then(page => {
                dispatch(fetchRecipesPageSuccess(page))
            })
            .catch(error => {
                dispatch(fetchFailure(error))
            })
    }
}

const fetchRecipesPageByUriSuccess = page => ({
    type: FETCH_RECIPES_PAGE_BY_URI_SUCCESS,
    payload: { page }
})

export function fetchRecipesPageByUri(uri, ingredients, updateClientUri) {
    return (dispatch, getState, { PantryCookApi }) => {

        console.log(uri)
        if(ingredients)
            ingredients = ingredients.map(ing => ing.name)

        dispatch(fetchBegin())
        const access_token = localStorage.getItem('access_token')
        PantryCookApi.pantryRecipes.getPageByUri(uri, ingredients, access_token)
            .then(page => {
                dispatch(fetchRecipesPageByUriSuccess(page))
                updateClientUri()
            })
            .catch(error => {
                console.log(error)
                dispatch(fetchFailure(error))
            })
    } 
}