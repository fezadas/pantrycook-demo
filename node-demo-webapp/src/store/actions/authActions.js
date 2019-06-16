export const BEGIN = 'BEGIN'
export const LOGIN = 'LOGIN'
export const ERROR = 'ERROR'
export const LOGOUT = 'LOGOUT'

const loginBegin = () => ({
    type: BEGIN
})

const failure = error => ({
    type: ERROR,
    payload: { error }
})

const login = (tokens,username) => ({
    type: LOGIN,
    payload: {tokens,username}
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
                dispatch(login(tokens,username))
            })
            .catch(error => {
                dispatch(failure(error))
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
                        dispatch(failure(tokens,username))
                    })
            })
            .catch(error => {
                dispatch(failure(error))
            })
    }
}

export const signOut = () => {
    return (dispatch, getState, { storageUtils }) => {
        storageUtils.deleteTokens()
        dispatch(logout())
    }
}

