export const BEGIN = 'BEGIN'
export const ERROR = 'ERROR'
export const RECIPES_SUCCESS = 'RECIPES_SUCCESS'

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

function getAccessToken(storageUtils, PantryCookApi) {
    return storageUtils.getAccessToken(PantryCookApi.auth.refreshToken.bind(PantryCookApi.auth))
}
