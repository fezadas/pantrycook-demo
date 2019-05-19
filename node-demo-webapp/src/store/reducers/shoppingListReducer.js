import {
    FETCH_BEGIN,
    FETCH_ERROR,
    FETCH_SHOPPING_LIST_SUCCESS,
    POST_SHOPPING_LIST_SUCCESS,
    FETCH_SHOPPING_LISTS_SUCCESS,
    PUT_SHOPPING_LIST_SUCCESS,
    DELETE_SHOPPING_LIST_SUCCESS
} from '../actions/shoppingListActions'

const initState = {
    shoppingList: { loading: false, shoppingList: null, createdId: null, error: null }
}

const shoppingListReducer = (state = initState, action) => {
    switch(action.type) {
        
        case FETCH_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            }
        case FETCH_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                recipes: null
            }
        case FETCH_SHOPPING_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                shoppingList: action.payload.shoppingList
            }
        case FETCH_SHOPPING_LISTS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                shoppingLists: action.payload.shoppingLists
            }
        case POST_SHOPPING_LIST_SUCCESS: 
            return {
                ...state,
                loading: false,
                error: null,
                createdId: action.payload.shoppingList.id
            }
        case PUT_SHOPPING_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                shoppingList: action.payload.shoppingList
            }
        case DELETE_SHOPPING_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                shoppingList: null
            }
        default :
            return state
    }
}

export default shoppingListReducer 