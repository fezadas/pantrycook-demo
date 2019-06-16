import {
    USER_BEGIN,
    USER_ERROR,
    USER_SUCCESS,
    USER_PASSWORD_BEGIN,
    USER_PASSWORD_SUCCESS,
    USER_PASSWORD_ERROR
} from '../actions/userActions'

const initState = {
    recipes: { loading: false, userInfo: null, error: 'colocar dummy data?' }
}

const userReducer = (state = initState, action) => {
    switch(action.type) {
        
        case USER_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            }
        case USER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                userInfo: null
            }
        case USER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                userInfo: action.payload.userInfo
            }  
        case USER_PASSWORD_BEGIN:
            return {
                ...state,
                loading: true,
                authError: null
            }
        case USER_PASSWORD_ERROR:
            return {
                ...state,
                loading: false,
                authError: action.payload.error,
                username: null
            }
        case USER_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                authError: null,
                username: action.payload.username
            }  
        default :
            return state
    }
}

export default userReducer 