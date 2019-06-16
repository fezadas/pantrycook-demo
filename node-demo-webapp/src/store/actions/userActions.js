export const USER_BEGIN = 'USER_BEGIN'
export const USER_SUCCESS = 'USER_SUCCESS'
export const USER_ERROR = 'USER_ERROR'

export const USER_PASSWORD_SUCCESS = 'USER_PASSWORD_SUCCESS'
export const USER_PASSWORD_BEGIN = 'USER_PASSWORD_BEGIN'
export const USER_PASSWORD_ERROR = 'USER_PASSWORD_ERROR'

const fetchUserBegin = () => ({
    type: USER_BEGIN
})

const fetchUserPasswordBegin = () => ({
    type: USER_PASSWORD_BEGIN
})

const fetchUserPasswordError = error => ({
    type: USER_PASSWORD_ERROR,
    payload: { error }
})

const fetchUserError = error => ({
    type: USER_ERROR,
    payload: { error }
})


const fetchUserSuccess = userInfo => ({
    type: USER_SUCCESS,
    payload: { userInfo }
})

const fetchUserChangePasswordSuccess = username => ({
    type: USER_PASSWORD_SUCCESS,
    payload: { username }
})


export const fetchUserInfo = () => {
    return async (dispatch, getState, { PantryCookApi,storageUtils }) => {        
        dispatch(fetchUserBegin())
        try {
            const access_token = await getAccessToken(storageUtils, PantryCookApi)
            const userInfo = await PantryCookApi.users.get(access_token)
            dispatch(fetchUserSuccess(userInfo))
        }
        catch(error) {
            dispatch(fetchUserError(error))
        }
    }
}

export const changePassword = (credentials) => {
    return async (dispatch, getState, { PantryCookApi,storageUtils }) => {        
        dispatch(fetchUserPasswordBegin())
        try {
            const access_token = await getAccessToken(storageUtils, PantryCookApi)
            const username = await PantryCookApi.users.changePassword(access_token,credentials)
            dispatch(fetchUserChangePasswordSuccess(username))
        }
        catch(error) {
            dispatch(fetchUserPasswordError(error))
        }
    }
}


function getAccessToken(storageUtils, PantryCookApi) {
    return storageUtils.getAccessToken(PantryCookApi.auth.refreshToken.bind(PantryCookApi.auth))
}