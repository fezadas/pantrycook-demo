import {
    USER_BEGIN,
    USER_ERROR,
    USER_SUCCESS
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
        default :
            return state
    }
}

export default userReducer 