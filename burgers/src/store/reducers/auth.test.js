import * as actionTypes from '../../store/actions/actionTypes';
import reducer from './auth';

describe('auth reducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        })
    })

    it('should store token when successful authenticated', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        }, {
            type: actionTypes.AUTH_SUCCESS, 
            idToken: 'test_token',
            userId: 'test_id'
        }
        )).toEqual({
            token: 'test_token',
            userId: 'test_id',
            error: null,
            loading: false,
            authRedirectPath: '/'
        })
    })
})