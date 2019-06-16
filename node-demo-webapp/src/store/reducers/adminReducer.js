import {
    BEGIN,
    ERROR,
    RECIPES_SUCCESS,
} from '../actions/adminActions'

const initState = { loading: false, error: null, info: null }

const adminReducer = (state = initState, action) => {
    switch(action.type) {
        case BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            }   
        case ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            }  
        case RECIPES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                recipes:action.payload.recipes
            }
        default :
            return state
        }
}

export default adminReducer 