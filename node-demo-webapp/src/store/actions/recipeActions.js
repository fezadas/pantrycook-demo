export const FETCH_BEGIN = 'FETCH_RANDOM_BEGIN'
export const FETCH_RANDOM_RECIPES_SUCCESS = 'FETCH_RANDOM_RECIPES_SUCCESS'
export const FETCH_ERROR = 'FETCH_RANDOM_ERROR'
export const FETCH_RECIPE_INFO_SUCCESS = 'FETCH_RECIPE_INFO_SUCCESS'
export const FETCH_PANTRY_RECIPE_INFO_SUCCESS = 'FETCH_PANTRY_RECIPE_INFO_SUCCESS'

const fetchBegin = () => ({
    type: FETCH_BEGIN
})

const fetchFailure = error => ({
    type: FETCH_ERROR,
    payload: { error }
})

const fetchRandomRecipesSuccess = recipes => ({
    type: FETCH_RANDOM_RECIPES_SUCCESS,
    payload: { recipes }
})

export function fetchRandomRecipes(randomNum) {
    return (dispatch, getState, { PantryCookApi }) => {
        dispatch(fetchBegin())
        PantryCookApi.recipes.getRandomList(randomNum)
            .then(recipes => {
                dispatch(fetchRandomRecipesSuccess(recipes))
            })
            .catch(error => {
                dispatch(fetchFailure(error))
            })
    }
}

const fetchRecipeInfoSuccess = recipeInfo => ({
    type: FETCH_RECIPE_INFO_SUCCESS,
    payload: { recipeInfo }
})

export function fetchRecipeInfo(id) {
    return (dispatch, getState, { PantryCookApi }) => {        
        dispatch(fetchBegin())
        PantryCookApi.recipes.get(id)
            .then(recipeInfo => {
                dispatch(fetchRecipeInfoSuccess(recipeInfo))
            })
            .catch(error => {
                dispatch(fetchFailure(error))
            })
    }
}