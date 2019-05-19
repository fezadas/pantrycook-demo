import {
    FETCH_BEGIN,
    FETCH_PANTRY_SUCCESS,
    FETCH_PANTRY_EDIT_SUCCESS,
    FETCH_ERROR,
    UPDATE_PANTRY_INGS_QUANTITY,
    POST_PANTRY_ING_SUCCESS,
    DELETE_PANTRY_ING_SUCCESS,
    EDIT_PANTRY_ING_SUCCESS
} from '../actions/pantryActions'

const initState = {
    pantry: { loading: false, ingredients: null, error: 'colocar dummy data?', updated: false }
}

const pantryReducer = (state = initState, action) => {
    switch(action.type) {
        case FETCH_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            }
        case FETCH_PANTRY_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                pantry: action.payload.pantry
            }
        case FETCH_PANTRY_EDIT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                pantry: action.payload.pantry,
                ingredients: action.payload.ingredients
            }    
        case FETCH_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                recipes: null
            }
        case UPDATE_PANTRY_INGS_QUANTITY:
            return {
                ...state,
                loading: false,
                error: null,
                updated: true
            }
        case POST_PANTRY_ING_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                pantry: action.payload.pantry
        }
        case DELETE_PANTRY_ING_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                pantry: action.payload.pantry
        } 
        case EDIT_PANTRY_ING_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                pantry: action.payload.pantry
        }      
        default :
            return state
    }
}

export default pantryReducer 