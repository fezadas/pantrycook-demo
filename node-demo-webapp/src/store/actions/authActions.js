export const LOGIN_BEGIN = 'LOGIN_BEGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const SIGNUP_ERROR = 'SIGNUP_ERROR'
export const LOGOUT = 'LOGOUT'

const loginBegin = () => ({
    type: LOGIN_BEGIN
})

const loginFailure = error => ({
    type: LOGIN_ERROR,
    payload: { error }
})

const loginSuccess = (tokens,username) => ({
    type: LOGIN_SUCCESS,
    payload: { tokens,username}
})

const signUpFailure = error => ({
    type: SIGNUP_ERROR,
    payload: { error }
})

export const logout = () => ({
    type: LOGOUT
})

export const signIn = (credentials) => {
    return (dispatch, getState, { PantryCookApi, storageUtils }) => {
        const { username, password } = credentials

        dispatch(loginBegin())
        PantryCookApi.auth.getTokens(username, password)
            .then(tokens => {
                storageUtils.saveTokens(tokens)
                storageUtils.saveItem('username', username)
                dispatch(loginSuccess(tokens,username))
            })
            .catch(error => {
                dispatch(signUpFailure(error))
            })
    }
}

export const signUp = (credentials) => {
    return (dispatch, getState, { PantryCookApi, storageUtils }) => {
        const { username, name, password } = credentials

        dispatch(loginBegin())
        PantryCookApi.auth.createUser(username, name, password)
            .then(res => {
                PantryCookApi.auth.getTokens(username, password)
                    .then(tokens => {
                        storageUtils.saveTokens(tokens)
                        storageUtils.saveItem('username', username)
                        dispatch(loginSuccess(tokens,username))
                    })
            })
            .catch(error => {
                dispatch(loginFailure(error))
            })
    }
}

export const signOut = () => {
    return (dispatch, getState, { storageUtils }) => {
        storageUtils.deleteTokens()
        dispatch(logout())
    }
}