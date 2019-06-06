export const USER_BEGIN = 'USER_BEGIN'
export const USER_SUCCESS = 'USER_SUCCESS'
export const USER_ERROR = 'USER_ERROR'

const fetchUserBegin = () => ({
    type: USER_BEGIN
})

const fetchUserError = error => ({
    type: USER_ERROR,
    payload: { error }
})

const fetchUserSuccess = userInfo => ({
    type: USER_SUCCESS,
    payload: { userInfo }
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

function getAccessToken(storageUtils, PantryCookApi) {
    return storageUtils.getAccessToken(PantryCookApi.auth.refreshToken.bind(PantryCookApi.auth))
}