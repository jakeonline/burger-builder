import * as actionTypes from '../actions/actionTypes'
import axios from 'axios'

export const authUser = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authUserStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        // console.log(`isSignUp: ${isSignUp}`)
        let authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAbhAyI2nQdnWAwDdlPzNS1SdSv_A7FrFw';
        if (!isSignUp) {
            authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAbhAyI2nQdnWAwDdlPzNS1SdSv_A7FrFw';
        }
        axios.post(authUrl, authData)
            .then(response => {
                // console.log(response);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('expirationDate', new Date(new Date().getTime() + response.data.expiresIn * 1000));
                dispatch(authUserSuccess(response.data.localId, response.data.idToken));
                dispatch(checkAuthLogout(response.data.expiresIn))
            })
            .catch(error => {
                // console.log(error);
                // console.log(error.response);
                dispatch(authUserFail(error.response.data.error));
            })

        // post 
    }
}

export const authUserStart = () => {
    return {
        type: actionTypes.AUTH_USER_START
    }
}

export const authUserSuccess = (userId, idToken) => {
    return {
        type: actionTypes.AUTH_USER_SUCCESS,
        userId: userId,
        idToken: idToken
    }
}

export const checkAuthLogout = (expirationTimeout) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTimeout * 1000);
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');

    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const authUserFail = (error) => {
    return {
        type: actionTypes.AUTH_USER_FAIL,
        error: error
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const checkAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const expirationDate = new Date(localStorage.getItem('expirationDate'));

        const hasTimeBeforeTimeout = new Date() < new Date(expirationDate)
        const updatedExpirationTime = (expirationDate.getTime() - new Date().getTime())/1000

        if (!token) {
            dispatch(logout());
        } else {
            if (hasTimeBeforeTimeout) {
                dispatch(authUserSuccess(userId, token));
                dispatch(checkAuthLogout(updatedExpirationTime))
            } else {
                dispatch(logout());

            }
        }

    }
}