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

export function fetchShoppingList(id, afterSuccess) {
    return async (dispatch, getState, { PantryCookApi, storageUtils }) => {
        dispatch(fetchBegin())
        try {
            const access_token = await getAccessToken(storageUtils, PantryCookApi)
            const shoppingList = await PantryCookApi.shoppingLists.get(id, access_token)
            dispatch(fetchShoppingListSuccess(shoppingList))
            if(afterSuccess) afterSuccess(shoppingList)
        }
        catch(error) {
            dispatch(fetchFailure(error))
        }
    }
}

const fetchShoppingListsSuccess = shoppingLists => ({
    type: FETCH_SHOPPING_LISTS_SUCCESS,
    payload: { shoppingLists }  
})

export function fetchShoppingLists() {
    return async (dispatch, getState, { PantryCookApi, storageUtils }) => {
        dispatch(fetchBegin())
        try {
            const access_token = await getAccessToken(storageUtils, PantryCookApi)
            const list = await PantryCookApi.shoppingLists.getAll(access_token)
            dispatch(fetchShoppingListsSuccess(list))
        }
        catch(error) {
            dispatch(fetchFailure(error))
        }
    }
}

const postShoppingListSuccess = shoppingList => ({
    type: POST_SHOPPING_LIST_SUCCESS,
    payload: { shoppingList }  
})

export function createShoppingList(shoppingList, redirectToList) {
    return async (dispatch, getState, { PantryCookApi, storageUtils }) => {
        dispatch(fetchBegin())
        try {
            const access_token = await getAccessToken(storageUtils, PantryCookApi)
            const list = await PantryCookApi.shoppingLists.post(shoppingList, access_token)
            redirectToList(list.id)
            dispatch(postShoppingListSuccess(list))
        }
        catch(error) {
            dispatch(fetchFailure(error))
        }
    }
}

const putShoppingListSuccess = shoppingList => ({
    type: PUT_SHOPPING_LIST_SUCCESS,
    payload: { shoppingList }  
})

export function updateShoppingList(shoppingList, afterSuccess) {
    return async (dispatch, getState, { PantryCookApi, storageUtils }) => {
        dispatch(fetchBegin())
        try {
            const access_token = await getAccessToken(storageUtils, PantryCookApi)
            const list = await PantryCookApi.shoppingLists.put(shoppingList.id, shoppingList, access_token)
            dispatch(putShoppingListSuccess(list))
            afterSuccess()
        }
        catch(error) {
            dispatch(fetchFailure(error))
        }
    }
}

const deleteShoppingListSuccess = shoppingList => ({
    type: DELETE_SHOPPING_LIST_SUCCESS,
    payload: { shoppingList }  
})

export function deleteShoppingList(id, afterSuccess) {
    return async (dispatch, getState, { PantryCookApi, storageUtils }) => {
        dispatch(fetchBegin())
        try {
            const access_token = await getAccessToken(storageUtils, PantryCookApi)
            const list = await PantryCookApi.shoppingLists.delete(id, access_token)
            dispatch(deleteShoppingListSuccess(list))
            afterSuccess()
        }
        catch(error) {
            dispatch(fetchFailure(error))
        }
    }
}

export function addShoppingListItemsToPantry(id, afterSuccess) {
    return async (dispatch, getState, { PantryCookApi, storageUtils }) => {
        dispatch(fetchBegin())
        try {
            const access_token = await getAccessToken(storageUtils, PantryCookApi)
            const list = await PantryCookApi.shoppingLists.patch(id, { 'action': 'removeAndUpdatePantry' }, access_token)
            dispatch(deleteShoppingListSuccess(list))
            afterSuccess()
        }
        catch(error) {
            dispatch(fetchFailure(error))
        }
    }
}

function getAccessToken(storageUtils, PantryCookApi) {
    return storageUtils.getAccessToken(PantryCookApi.auth.refreshToken.bind(PantryCookApi.auth))
}