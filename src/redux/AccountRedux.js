import * as localStorageVariable from '../variables/LocalStorage';
import instance from '../services/AxiosServices';

// Lấy lại access token sau mỗi 9 phút (vì thời gian tồn tại tối đa của access token la 10 phút)
const getRefreshToken = async () => {
    instance.defaults.headers.common['x_authorization'] = localStorage.getItem(localStorageVariable.storeAccessToken);
    try {
        const {
            data
        } = await instance.post('auth/refresh', {
            refreshToken: localStorage.getItem(localStorageVariable.storeRefreshToken)
        })
        localStorage.setItem(localStorageVariable.storeAccessToken, data.accessToken);   
    } catch (error) {
        console.log(error.response.data);
    }
}
getRefreshToken()
setInterval(getRefreshToken, 540000);

export const action = {
    login: (account) => async dispatch => {
        instance.defaults.headers.common['x_authorization'] = localStorage.getItem(localStorageVariable.storeAccessToken);

        try {
            const {
                data
            } = await instance.post('auth/login', account);

            localStorage.setItem(localStorageVariable.storeAccessToken, data.accessToken);
            localStorage.setItem(localStorageVariable.storeRefreshToken, data.refreshToken);
            localStorage.setItem(localStorageVariable.storeAccount, JSON.stringify(data.account));

            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: data
            })
        } catch (error) {
            const msg = error.response.data;

            dispatch({
                type: 'LOGIN_FAILED',
                payload: {
                    msg
                }
            })
        }
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
    if (action.type === 'LOGIN_SUCCESS') {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.account = action.payload.account;
        return {
            accessToken: action.payload.accessToken,
            refreshToken: action.payload.refreshToken,
            account: action.payload.account,
        }
    } else if (action.type === 'LOGIN_FAILED') {
        return {
            msg: action.payload.msg
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