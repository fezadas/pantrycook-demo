export const FETCH_BEGIN = 'FETCH_BEGIN'
export const FETCH_PANTRY_SUCCESS = 'FETCH_PANTRY_SUCCESS'
export const FETCH_ERROR = 'FETCH_ERROR'
export const UPDATE_PANTRY_INGS_QUANTITY = 'UPDATE_PANTRY_INGS_QUANTITY'
export const FETCH_PANTRY_EDIT_SUCCESS = 'FETCH_PANTRY_EDIT_SUCCESS'
export const POST_PANTRY_ING_SUCCESS = 'POST_PANTRY_ING_SUCCESS'
export const DELETE_PANTRY_ING_SUCCESS = 'DELETE_PANTRY_ING_SUCCESS'
export const EDIT_PANTRY_ING_SUCCESS = 'EDIT_PANTRY_ING_SUCCESS'

const fetchBegin = () => ({
    type: FETCH_BEGIN
})

const fetchFailure = error => ({
    type: FETCH_ERROR,
    payload: { error }
})

const fecthPantrySuccess = pantry => ({
    type: FETCH_PANTRY_SUCCESS,
    payload: { pantry }
})

const fecthPantryEditSuccess = (pantry,ingredients) => ({
    type: FETCH_PANTRY_EDIT_SUCCESS,
    payload: { 
        pantry : pantry,
        ingredients : ingredients
    }
})

const fetchPantryFillSuccess = (ingredients) => ({
    type: POST_PANTRY_ING_SUCCESS,
    payload: { 
        pantry : ingredients
    }
})

const fetchPantryRemoveSuccess = (ingredients) => ({
    type: DELETE_PANTRY_ING_SUCCESS,
    payload: { 
        pantry : ingredients
    }
})

const fetchPantryEditSuccess = (ingredients) => ({
    type: EDIT_PANTRY_ING_SUCCESS,
    payload: { 
        pantry : ingredients
    }
})

const updatePantryIngredientsQuantitySuccess = pantry => ({
    type: UPDATE_PANTRY_INGS_QUANTITY,
    payload: { val: true } //FIXME
})

export function fetchPantry(suggestion, suggestionLimit) {
    return async (dispatch, getState, { PantryCookApi, storageUtils }) => {
        dispatch(fetchBegin())
        try{
            const access_token = await getAccessToken(storageUtils, PantryCookApi)
            const pantry =  await PantryCookApi.pantryIngredients.getList(access_token, suggestion)
            dispatch(fecthPantrySuccess(pantry))
        }catch(error){
            dispatch(fetchFailure(error)) 
        }  
    }
}

export function fecthPantrytoEdit() {
    return async (dispatch, getState, { PantryCookApi, storageUtils }) => {
        dispatch(fetchBegin())
        try{
            const access_token = await getAccessToken(storageUtils, PantryCookApi)
            const pantry = await PantryCookApi.pantryIngredients.getList(access_token,null,null)
            const ingredients = await PantryCookApi.pantryIngredients.getListToAdd(access_token,true)
            dispatch(fecthPantryEditSuccess(pantry,ingredients))
        }catch(error){
            dispatch(fetchFailure(error)) 
        }
    }
}

export function updatePantryIngredientsQuantity(recipeId, handleSuccess, handleNotPossibleError) {
    return async (dispatch, getState, { PantryCookApi, storageUtils }) => {
        dispatch(fetchBegin())
        try{
            const access_token = await getAccessToken(storageUtils, PantryCookApi)
            await PantryCookApi.pantryIngredients.patchDiscountQuantities(recipeId, access_token)
            dispatch(updatePantryIngredientsQuantitySuccess())
            handleSuccess()
        }catch(error){
            dispatch(fetchFailure(error))  
            if(error.statusCode == 400)
                handleNotPossibleError()
        }
    }
}

export function fillPantryIngredient(ingredient) {
    return async (dispatch, getState, { PantryCookApi, storageUtils }) => {
        dispatch(fetchBegin())
        try{
            const access_token = await getAccessToken(storageUtils, PantryCookApi)
            const ingredients = await PantryCookApi.pantryIngredients.post(access_token, ingredient)
            dispatch(fetchPantryFillSuccess(ingredients))
        }catch(error){
             dispatch(fetchFailure(error))
        }
    }
}

export function removePantryIngredient(id) {
    return async (dispatch, getState, { PantryCookApi, storageUtils }) => {
        dispatch(fetchBegin())
        try{
            const access_token = await getAccessToken(storageUtils, PantryCookApi)
            const ingredients = await PantryCookApi.pantryIngredients.delete(access_token, id)
            dispatch(fetchPantryRemoveSuccess(ingredients))
        }catch(error){
            dispatch(fetchFailure(error))
        }
    }
}

export function editPantryIngredient(ingredient) {
    return async (dispatch, getState, { PantryCookApi, storageUtils }) => {
        dispatch(fetchBegin())
        try{
            const access_token = await getAccessToken(storageUtils, PantryCookApi)
            const ingredients = await PantryCookApi.pantryIngredients.put(access_token,ingredient)
            dispatch(fetchPantryEditSuccess(ingredients))
        }catch(error){
            dispatch(fetchFailure(error))
        }
    }
}

function getAccessToken(storageUtils, PantryCookApi) {
    return storageUtils.getAccessToken(PantryCookApi.auth.refreshToken.bind(PantryCookApi.auth))
}