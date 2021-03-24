import authReducer from './auth'
import * as actionTypes from '../actions/actionTypes'

describe('auth reducer', () => {

    it('should return the initial state', () => {
        expect(authReducer(undefined, {})).toEqual({
            userId: null,
            idToken: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    })

    it('should store token upon login', () => {
        expect(authReducer(undefined, {
            type: actionTypes.AUTH_USER_SUCCESS,
            userId: 'someUserId',
            idToken: 'someIdToken'
        })).toEqual({
            userId: 'someUserId',
            idToken: 'someIdToken',
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    })



});