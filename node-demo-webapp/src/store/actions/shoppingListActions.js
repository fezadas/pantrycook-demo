export const FETCH_BEGIN = 'FETCH_BEGIN'
export const FETCH_ERROR = 'FETCH_ERROR'
export const FETCH_SHOPPING_LIST_SUCCESS = 'FETCH_SHOPPING_LIST_SUCCESS'
export const FETCH_SHOPPING_LISTS_SUCCESS = 'FETCH_SHOPPING_LISTS_SUCCESS'
export const POST_SHOPPING_LIST_SUCCESS = 'POST_SHOPPING_LIST_SUCCESS'
export const PUT_SHOPPING_LIST_SUCCESS = 'PUT_SHOPPING_LIST_SUCCESS'
export const DELETE_SHOPPING_LIST_SUCCESS = 'DELETE_SHOPPING_LIST_SUCCESS'

const fetchBegin = () => ({
    type: FETCH_BEGIN
})

const fetchFailure = error => ({
    type: FETCH_ERROR,
    payload: { error }
})

const fetchShoppingListSuccess = shoppingList => ({
    type: FETCH_SHOPPING_LIST_SUCCESS,
    payload: { shoppingList }  
})

const fetchShoppingListsSuccess = shoppingLists => ({
    type: FETCH_SHOPPING_LISTS_SUCCESS,
    payload: { shoppingLists }  
})

const postShoppingListSuccess = shoppingList => ({
    type: POST_SHOPPING_LIST_SUCCESS,
    payload: { shoppingList }  
})

const putShoppingListSuccess = shoppingList => ({
    type: PUT_SHOPPING_LIST_SUCCESS,
    payload: { shoppingList }  
})

const deleteShoppingListSuccess = shoppingList => ({
    type: DELETE_SHOPPING_LIST_SUCCESS,
    payload: { shoppingList }  
})

export function fetchShoppingList(id, afterSuccess) {
    return (dispatch, getState, { PantryCookApi }) => {
        dispatch(fetchBegin())
        PantryCookApi.shoppingLists.get(id, localStorage.getItem('access_token'))
            .then(shoppingList => {
                dispatch(fetchShoppingListSuccess(shoppingList))
                if(afterSuccess) afterSuccess(shoppingList)
            })
            .catch(error => {
                dispatch(fetchFailure(error))
            })
    }
}

export function fetchShoppingLists() {
    return (dispatch, getState, { PantryCookApi }) => {
        dispatch(fetchBegin())
        PantryCookApi.shoppingLists.getAll(localStorage.getItem('access_token'))
            .then(list => {
                dispatch(fetchShoppingListsSuccess(list))
            })
            .catch(error => {
                dispatch(fetchFailure(error))
            })
    }
}

export function createShoppingList(shoppingList, redirectToList) {
    return (dispatch, getState, { PantryCookApi }) => {
        dispatch(fetchBegin())
        PantryCookApi.shoppingLists.post(shoppingList, localStorage.getItem('access_token'))
            .then(list => {
                redirectToList(list.id)
                dispatch(postShoppingListSuccess(list))
            })
            .catch(error => {
                dispatch(fetchFailure(error))
            })
    }
}

export function updateShoppingList(shoppingList, afterSuccess) {
    return (dispatch, getState, { PantryCookApi }) => {
        dispatch(fetchBegin())
        PantryCookApi.shoppingLists.put(shoppingList.id, shoppingList, localStorage.getItem('access_token'))
            .then(list => {
                dispatch(putShoppingListSuccess(list))
                afterSuccess()
            })
            .catch(error => {
                dispatch(fetchFailure(error))
            })
    }
}

export function deleteShoppingList(id, afterSuccess) {
    return (dispatch, getState, { PantryCookApi }) => {
        dispatch(fetchBegin())
        PantryCookApi.shoppingLists.delete(id, localStorage.getItem('access_token'))
            .then(list => {
                dispatch(deleteShoppingListSuccess(list))
                afterSuccess()
            })
            .catch(error => {
                dispatch(fetchFailure(error))
            })
    }
}

export function addShoppingListItemsToPantry(id, afterSuccess) {
    return (dispatch, getState, { PantryCookApi }) => {
        dispatch(fetchBegin())
        const actionObj = { 'action': 'removeAndUpdatePantry' }
        PantryCookApi.shoppingLists.patch(id, actionObj, localStorage.getItem('access_token'))
            .then(list => {
                dispatch(deleteShoppingListSuccess(list))
                afterSuccess()
            })
            .catch(error => {
                dispatch(fetchFailure(error))
            })
    }
}