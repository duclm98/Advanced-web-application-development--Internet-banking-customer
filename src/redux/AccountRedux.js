import * as localStorageVariable from '../variables/LocalStorage';
import instance from '../services/AxiosServices';

// Lấy lại access token sau mỗi 9 phút (vì thời gian tồn tại tối đa của access token la 10 phút)
const getRefreshToken = async () => {
    try {

        const response = await instance.post('auth/refresh', {
            refreshToken: localStorage.getItem(localStorageVariable.storeRefreshToken)
        })
        console.log(response.data)
        localStorage.setItem(localStorageVariable.storeAccessToken, response.data.accessToken);
    } catch (error) {
        console.log(error);
    }
}
getRefreshToken()
setInterval(getRefreshToken, 540000);

export const action = {
    login: (account) => async dispatch => {
        instance.defaults.headers.common['x_authorization'] = localStorage.getItem(localStorageVariable.storeAccessToken);
        const response = await instance.post('auth/login', account);

        localStorage.setItem(localStorageVariable.storeAccessToken, response.data.accessToken);
        localStorage.setItem(localStorageVariable.storeRefreshToken, response.data.refreshToken);
        localStorage.setItem(localStorageVariable.storeAccount, JSON.stringify(response.data.account));

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
    accessToken: localStorage.getItem(localStorageVariable.storeAccessToken),
    refreshToken: localStorage.getItem(localStorageVariable.storeRefreshToken),
    account: localStorage.getItem(localStorageVariable.storeAccount),
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