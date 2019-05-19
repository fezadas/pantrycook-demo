export const FETCH_RANDOM_BEGIN = 'FETCH_RANDOM_BEGIN'
export const FETCH_RANDOM_RECIPES_SUCCESS = 'FETCH_RANDOM_RECIPES_SUCCESS'
export const FETCH_RANDOM_ERROR = 'FETCH_RANDOM_ERROR'
export const FETCH_RECIPE_INFO_SUCCESS = 'FETCH_RECIPE_INFO_SUCCESS'
export const FETCH_PANTRY_RECIPE_INFO_SUCCESS = 'FETCH_PANTRY_RECIPE_INFO_SUCCESS'

const fetchRandomBegin = () => ({
    type: FETCH_RANDOM_BEGIN
})

const fetchRandomFailure = error => ({
    type: FETCH_RANDOM_ERROR,
    payload: { error }
})

const fetchRandomRecipesSuccess = recipes => ({
    type: FETCH_RANDOM_RECIPES_SUCCESS,
    payload: { recipes }
})

const fetchRecipeInfoSuccess = recipeInfo => ({
    type: FETCH_RECIPE_INFO_SUCCESS,
    payload: { recipeInfo }
})

export function fetchRandomRecipes(randomNum) {
    return (dispatch, getState, { PantryCookApi }) => {
        console.log('here')
        dispatch(fetchRandomBegin())
        PantryCookApi.recipes.getRandomList(randomNum)
            .then(recipes => {
                dispatch(fetchRandomRecipesSuccess(recipes))
            })
            .catch(error => {
                console.log(error)
                dispatch(fetchRandomFailure(error))
            })
    }
}

export function fetchRecipeInfo(id) {
    return (dispatch, getState, { PantryCookApi }) => {
        
        dispatch(fetchRandomBegin())
        PantryCookApi.recipes.get(id)
            .then(recipeInfo => {
                dispatch(fetchRecipeInfoSuccess(recipeInfo))
            })
            .catch(error => {
                dispatch(fetchRandomFailure(error))
            })
    }
}