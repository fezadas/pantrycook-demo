import {
    BEGIN,
    ERROR,
    LOGIN,
    LOGOUT
} from '../actions/authActions'

const initState = { loading: false, error: null, auth: false }

const authReducer = (state = initState, action) => {
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
        case LOGIN:
            return {
                loading: false,
                error: null,
                auth: true
            }
        case LOGOUT:
            return {
                ...state,
                auth: false,
                loading:false
            }
        default :
            return state
        }
}

export default authReducer 