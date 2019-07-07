export const BEGIN = 'BEGIN'
export const ERROR = 'ERROR'
export const RECIPES_SUCCESS = 'RECIPES_SUCCESS'
export const CREATE_RECIPE_SUCCESS = 'CREATE_RECIPE_SUCCESS'
export const DELETE_RECIPE_SUCCESS = 'DELETE_RECIPE_SUCCESS'
export const GET_MEALDB_RECIPE_SUCCESS = 'GET_MEALDB_RECIPE_SUCCESS'

const begin = () => ({
    type: BEGIN
})

const failure = error => ({
    type: ERROR,
    payload: { error }
})

const fetchRecipesSuccess = recipes => ({
    type: RECIPES_SUCCESS,
    payload: { recipes }
})

export const getRecipes = () => {
    return async (dispatch, getState, { PantryCookApi, storageUtils }) => {
        dispatch(begin())
        try {
            const access_token = await getAccessToken(storageUtils, PantryCookApi)
            const recipes = await PantryCookApi.admin.getRecipes(access_token)
            dispatch(fetchRecipesSuccess(recipes))
        }
        catch(error) {
            dispatch(failure(error))
        }
    }
}

const fetchCreateRecipeSuccess = recipe => ({
    type: CREATE_RECIPE_SUCCESS,
    payload: { recipe }
})

const fetchDeleteRecipeSuccess = recipes => ({
    type: DELETE_RECIPE_SUCCESS,
    payload: { recipes }
})

export const createRecipe = (recipe, redirectToRecipe) => {
    return async (dispatch, getState, { PantryCookApi, storageUtils }) => {
        dispatch(begin())
        try {
            const access_token = await getAccessToken(storageUtils, PantryCookApi)
            const postedRecipe = await PantryCookApi.admin.postRecipe(access_token, recipe)
            redirectToRecipe(postedRecipe.id)
            dispatch(fetchCreateRecipeSuccess(postedRecipe))
        }
        catch(error) {
            dispatch(failure(error))
        }
    }
}

export const deleteRecipe = (id) => {
    return async (dispatch, getState, { PantryCookApi, storageUtils }) => {
        dispatch(begin())
        try {
            const access_token = await getAccessToken(storageUtils, PantryCookApi)
            const recipes = await PantryCookApi.admin.deleteRecipe(access_token, id)
            dispatch(fetchDeleteRecipeSuccess(recipes))
        }
        catch(error) {
            dispatch(failure(error))
        }
    }
}

const fetchMealDbRecipeSuccess = mealDbRecipe => ({
    type: GET_MEALDB_RECIPE_SUCCESS,
    payload: { mealDbRecipe }
})

export const getRandomMealDbRecipe = () => {
    return async (dispatch, getState, { PantryCookApi, storageUtils }) => {
        dispatch(begin())
        try {
            const access_token = await getAccessToken(storageUtils, PantryCookApi)
            const recipe = await PantryCookApi.admin.getRandomMealDbRecipe(access_token)
            dispatch(fetchMealDbRecipeSuccess(recipe))
        }
        catch(error) {
            dispatch(failure(error))
        }
    }
}

function getAccessToken(storageUtils, PantryCookApi) {
    return storageUtils.getAccessToken(PantryCookApi.auth.refreshToken.bind(PantryCookApi.auth))
}
