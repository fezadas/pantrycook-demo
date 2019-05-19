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
    payload: { val: true } //FIXME !!!!!! rota
})

export function fetchPantry(suggestion, missing) {
    return (dispatch, getState, { PantryCookApi }) => {
        
        dispatch(fetchBegin())
        PantryCookApi.pantryIngredients.getList(localStorage.getItem('access_token'), suggestion, missing)
            .then(pantry => {
                dispatch(fecthPantrySuccess(pantry))
            })
            .catch(error => {
                dispatch(fetchFailure(error))
            })
    }
}

export function fecthPantrytoEdit() {
    return (dispatch, getState, { PantryCookApi }) => {
        const token = localStorage.getItem('access_token')
        dispatch(fetchBegin())
        PantryCookApi.pantryIngredients.getList(token,null,null)
            .then(pantry => {
                PantryCookApi.pantryIngredients.getListToAdd(token,true)
                    .then(ingredients => {
                        dispatch(fecthPantryEditSuccess(pantry,ingredients))
                    })
                    .catch(error => { throw error })
            })
            .catch(error => {
                dispatch(fetchFailure(error))
            })
    }
}

export function updatePantryIngredientsQuantity(ingredientsList, handleSuccess, handleNotPossibleError) {
    return (dispatch, getState, { PantryCookApi }) => {
        dispatch(fetchBegin())
        PantryCookApi.pantryIngredients.patchDiscountQuantities(ingredientsList, localStorage.getItem('access_token'))
            .then(res => {
                dispatch(updatePantryIngredientsQuantitySuccess())
                handleSuccess()
            })
            .catch(error => {
                dispatch(fetchFailure(error))
                if(error.statusCode == 400)
                    handleNotPossibleError()
            })
    }
}

export function fillPantryIngredient(ingredient) {
    return (dispatch, getState, { PantryCookApi }) => {
        dispatch(fetchBegin())
        PantryCookApi.pantryIngredients.post(localStorage.getItem('access_token'), ingredient)
            .then((ingredients) => {
                dispatch(fetchPantryFillSuccess(ingredients))
            })
            .catch(error => {
                dispatch(fetchFailure(error))
            })
    }
}

export function removePantryIngredient(id) {
    return (dispatch, getState, { PantryCookApi }) => {
        dispatch(fetchBegin())
        PantryCookApi.pantryIngredients.delete(localStorage.getItem('access_token'), id)
            .then((ingredients) => {
                dispatch(fetchPantryRemoveSuccess(ingredients))
            })
            .catch(error => {
                dispatch(fetchFailure(error))
            })
    }
}

export function editPantryIngredient(ingredient) {
    return (dispatch, getState, { PantryCookApi }) => {
        dispatch(fetchBegin())
        console.log("HI")
        PantryCookApi.pantryIngredients.put(localStorage.getItem('access_token'),ingredient)
            .then((ingredients) => {
                dispatch(fetchPantryEditSuccess(ingredients))
            })
            .catch(error => {
                dispatch(fetchFailure(error))
            })
    }
}