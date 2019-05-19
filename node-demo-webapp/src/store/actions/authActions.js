export const LOGIN_BEGIN = 'LOGIN_BEGIN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERROR = 'LOGIN_ERROR'
export const SIGNUP_ERROR = 'SIGNUP_ERROR'
export const LOGOUT = 'LOGOUT'
export const REFRESH_TOKEN_BEGIN = 'REFRESH_TOKEN_BEGIN'
export const REFRESH_TOKEN_FAILURE = 'REFRESH_TOKEN_FAILURE'
export const REFRESH_TOKEN_SUCCESS = 'REFRESH_TOKEN_SUCCESS'

const loginBegin = () => ({
    type: LOGIN_BEGIN
})

const refreshTokenBegin = () => ({
    type: REFRESH_TOKEN_BEGIN
})

const refreshTokenFailure = error => ({
    type: REFRESH_TOKEN_FAILURE,
    payload: { error }
})

const refreshTokenSuccess = tokens => ({
    type: REFRESH_TOKEN_SUCCESS,
    payload: { tokens }
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
    return (dispatch, getState, { PantryCookApi }) => {
        const { username, password } = credentials

        dispatch(loginBegin())
        PantryCookApi.auth.getTokens(username, password)
            .then(tokens => {
                localStorage.setItem('access_token', tokens.access_token)
                localStorage.setItem('refresh_token', tokens.refresh_token)
                localStorage.setItem('username', username)
                dispatch(loginSuccess(tokens,username))
            })
            .catch(error => {
                dispatch(signUpFailure(error))
            })
    }
}

export const signUp = (credentials) => {
    return (dispatch, getState, { PantryCookApi }) => {
        const { username, name, password } = credentials

        dispatch(loginBegin())
        PantryCookApi.auth.createUser(username, name, password)
            .then(res => {
                PantryCookApi.auth.getTokens(username, password)
                    .then(tokens => {
                        localStorage.setItem('access_token', tokens.access_token)
                        localStorage.setItem('refresh_token', tokens.refresh_token)
                        localStorage.setItem('username', username)
                        dispatch(loginSuccess(tokens,username))
                    })
            })
            .catch(error => {
                dispatch(loginFailure(error))
            })
    }
}

export const signOut = () => {
    return (dispatch) => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        dispatch(logout())
    }
}

export const refreshToken = (refreshToken) => {
    return (dispatch, getState, { PantryCookApi }) => {
        dispatch(refreshTokenBegin())
        console.log('begin-refresh')
        PantryCookApi.auth.refreshToken(refreshToken)
            .then(tokens => {
                localStorage.setItem('access_token', tokens.access_token)
                localStorage.setItem('refresh_token', tokens.refresh_token)
                dispatch(refreshTokenSuccess(tokens))
            })
            .catch(error => {
                console.log(error)
                dispatch(refreshTokenFailure(error))
            })
    }
}