import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS, 
        idToken: authData.data.idToken,
        userId: authData.data.localId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_EXPIRE
    }
}

export const authTimeout = (expireTime) => {
    return dispatch => {
        setTimeout(() => {dispatch(logout())}, expireTime * 1000)
    }
}


export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBKaKyly7xuy8OSGos0OeVW12etQ62i2_c'
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBKaKyly7xuy8OSGos0OeVW12etQ62i2_c'
        }
        // console.log(authData);
        axios.post(url, authData)
        .then(response => {
            console.log(response.data);
            dispatch(authTimeout(response.data.expiresIn));
            dispatch(authSuccess(response));
        })
        .catch(err => {
            console.log(err);
            dispatch(authFail(err.response.data.error));
        })
    }
}