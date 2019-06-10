import {
    LOGIN_BEGIN,
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    LOGOUT,
    SIGNUP_ERROR
} from '../actions/authActions'

const initState = { tokens: null, loading: false, error: null }

const authReducer = (state = initState, action) => {
    switch(action.type) {
        case LOGIN_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            }   
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                tokens: action.payload.tokens,
                username: action.payload.username
            }
        case SIGNUP_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                tokens: null
            }
        case LOGIN_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                tokens: null
        }      
        case LOGOUT:
            return {
                ...state,
                auth:null,
                tokens: null
            }
        default :
            return state
        }
}

export default authReducer 