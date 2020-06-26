import axios from 'axios';
import {
    REACT_APP_BASE_BACKEND_URL
} from '../variables/React';

import * as localStorageService from '../services/LocalStorageServices';

const instance = axios.create({
    baseURL: REACT_APP_BASE_BACKEND_URL,
    timeout: 10000,
    headers: {
        'x_authorization': localStorageService.accessToken
    }
});

// 
const getRefreshToken = async () => {
    try {
        const response = await instance.post('auth/refresh', {
            refreshToken: localStorageService.refreshToken
        })
        console.log(response.data)
        localStorage.setItem(localStorageService.storeAccessToken, response.data.accessToken);
    } catch (error) {
        console.log(error);
    }
}
setInterval(getRefreshToken, 540000);

export const action = {
    login: (account) => async dispatch => {
        const response = await instance.post('auth/login', account);

        localStorage.setItem(localStorageService.storeAccessToken, response.data.accessToken);
        localStorage.setItem(localStorageService.storeRefreshToken, response.data.refreshToken);
        localStorage.setItem(localStorageService.storeAccount, JSON.stringify(response.data.account));

        dispatch({
            type: 'LOGIN',
            payload: response.data
        })
    },
    logout: () => dispatch => {
        localStorage.clear();

        dispatch({
            type: 'LOGOUT',
        })
    }
}

const initialState = {
    accessToken: localStorageService.accessToken,
    refreshToken: localStorageService.refreshToken,
    account: localStorageService.account,
};

export default (state = initialState, action) => {
    if (action.type === 'LOGIN') {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.account = action.payload.account;
        return {
            accessToken: action.payload.accessToken,
            refreshToken: action.payload.refreshToken,
            account: action.payload.account,
        }
    } else if (action.type === 'LOGOUT') {
        return {
            accessToken: null,
            refreshToken: null,
            account: null
        }
    }
    return state;
}