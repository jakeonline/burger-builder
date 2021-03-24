import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility'

const initialState = {
    userId: null,
    idToken: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

const authUserStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        error: null
    })
}

const authUserSuccess = (state, action) => {
    return updateObject(state, {
        userId: action.userId,
        idToken: action.idToken,
        loading: false
    })
}

const authUserFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    })
}

const authLogout = (state, action) => {
    return updateObject(state, {
        userId: null,
        idToken: null
    })
}

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, {
        authRedirectPath: action.path
    })
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_USER_START: return authUserStart(state, action);
        case actionTypes.AUTH_USER_SUCCESS: return authUserSuccess(state, action);
        case actionTypes.AUTH_USER_FAIL: return authUserFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
        default: return state;
    }
}

export default authReducer;