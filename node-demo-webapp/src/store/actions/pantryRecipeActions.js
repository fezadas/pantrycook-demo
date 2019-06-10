import query_string from 'query-string'

export const FETCH_BEGIN = 'FETCH_BEGIN'
export const FETCH_ERROR = 'FETCH_ERROR'
export const FETCH_PANTRY_RECIPE_INFO_SUCCESS = 'FETCH_PANTRY_RECIPE_INFO_SUCCESS'
export const FETCH_RECIPES_PAGE_SUCCESS = 'FETCH_RECIPES_PAGE_SUCCESS'
export const CLEAR_RECIPES_PAGES_CACHE = 'CLEAR_RECIPES_PAGES_CACHE'

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
    return async (dispatch, getState, { PantryCookApi, storageUtils }) => {
        dispatch(fetchBegin())  
        try {
            const access_token = await getAccessToken(storageUtils, PantryCookApi)
            const recipeInfo = await PantryCookApi.pantryRecipes.get(id, access_token)
            dispatch(fetchPantryRecipeInfoSuccess(recipeInfo))
        }
        catch(error) {
            dispatch(fetchFailure(error))
        }
    }
}

const fetchRecipesPageSuccess = (page, category, ingredients) => ({
    type: FETCH_RECIPES_PAGE_SUCCESS,
    payload: { page, filters: {category, ingredients} }
})

export function fetchRecipesPage(page, limit, category, ingredients, updateClientUri) {
    return async (dispatch, getState, { PantryCookApi, storageUtils }) => {
        const ings = ingredients
        if(ingredients)
            ingredients = ingredients.map(ing => ing.name)

        let query = {}
        if(category) query.category = category.name
        query.limit = limit
        if(page != 1) query.page = page
        query.limit = limit
        query = query_string.stringify(query).replace()
        query = query.replace(/%20/g, '+')
        
        dispatch(fetchBegin())   
        try {
            const access_token = await getAccessToken(storageUtils, PantryCookApi)
            const page = await PantryCookApi.pantryRecipes.getPage(query, ingredients, access_token)
            dispatch(fetchRecipesPageSuccess(page, category, ings == null ? [] : ings))
            if(updateClientUri)
                updateClientUri()
        }
        catch(error) {
            dispatch(fetchFailure(error))
        } 
    }
}

export function fetchRecipesPageByUri(uri, category, ingredients, updateClientUri) {
    return async (dispatch, getState, { PantryCookApi, storageUtils }) => {
        const ings = ingredients
        if(ingredients)
            ingredients = ingredients.map(ing => ing.name)

        dispatch(fetchBegin())
        try {
            const access_token = await getAccessToken(storageUtils, PantryCookApi)
            const page = await PantryCookApi.pantryRecipes.getPageByUri(uri, ingredients, access_token)
            dispatch(fetchRecipesPageSuccess(page, category, ings == null ? [] : ings))
            updateClientUri()
        }
        catch(error) {
            dispatch(fetchFailure(error))
        }
    } 
}

export function clearRecipesPagesCache() {
    return (dispatch) => dispatch({ type: CLEAR_RECIPES_PAGES_CACHE })
}

function getAccessToken(storageUtils, PantryCookApi) {
    return storageUtils.getAccessToken(PantryCookApi.auth.refreshToken.bind(PantryCookApi.auth))
}