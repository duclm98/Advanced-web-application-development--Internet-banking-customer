import * as localStorageVariable from "./variables/LocalStorage";
import instance from "./services/AxiosServices";

// Lấy lại access token sau mỗi 9 phút (vì thời gian tồn tại tối đa của access token la 10 phút)
const getRefreshToken = async () => {
    instance.defaults.headers.common["x_authorization"] = localStorage.getItem(
        localStorageVariable.storeAccessToken
    );
    try {
        const {
            data
        } = await instance.post("auth/refresh", {
            refreshToken: localStorage.getItem(
                localStorageVariable.storeRefreshToken
            ),
        });
        localStorage.setItem(
            localStorageVariable.storeAccessToken,
            data.accessToken
        );
    } catch (error) {
        console.log("Không tìm thấy access token mới.");
    }
};
getRefreshToken();
setInterval(getRefreshToken, 540000);

export const accountAction = {
    login: (account) => async (dispatch) => {
        instance.defaults.headers.common["x_authorization"] = localStorage.getItem(
            localStorageVariable.storeAccessToken
        );

        try {
            const {
                data
            } = await instance.post("auth/login", account);

            localStorage.setItem(
                localStorageVariable.storeAccessToken,
                data.accessToken
            );
            localStorage.setItem(
                localStorageVariable.storeRefreshToken,
                data.refreshToken
            );
            localStorage.setItem(
                localStorageVariable.storeAccount,
                JSON.stringify(data.account)
            );

            dispatch({
                type: "LOGIN_SUCCESS",
                payload: data,
            });
        } catch (error) {
            let msg = "Có lỗi xảy ra, vui lòng thử lại.";
            if (error.response) {
                msg = error.response.data;
            }

            dispatch({
                type: "LOGIN_FAILED",
                payload: {
                    msg,
                },
            });
        }
    },
    logout: () => (dispatch) => {
        localStorage.clear();

        dispatch({
            type: "LOGOUT",
        });
    },
    getAccount: (accountNumberFromBody) => async (dispatch) => {
        const accountNumber = accountNumberFromBody ?
            accountNumberFromBody :
            "0000000000000";
        instance.defaults.headers.common["x_authorization"] = localStorage.getItem(
            localStorageVariable.storeAccessToken
        );
        try {
            const {
                data
            } = await instance.get(
                `accounts/accountNumber/${accountNumber}`
            );
            dispatch({
                type: "GET_ACCOUNT",
                payload: data,
            });
            return {
                status: true,
                data
            }
        } catch (error) {
            return {
                status: false
            }
        }
    },
    getReceivers: () => async (dispatch) => {
        instance.defaults.headers.common["x_authorization"] = localStorage.getItem(
            localStorageVariable.storeAccessToken
        );
        const {
            data
        } = await instance.get("accounts/receivers");
        dispatch({
            type: "GET_RECEIVERS",
            payload: data,
        });
    },
    addReceiver: (receiver) => async (dispatch) => {
        instance.defaults.headers.common["x_authorization"] = localStorage.getItem(
            localStorageVariable.storeAccessToken
        );
        try {
            const {
                data
            } = await instance.post(`accounts/receivers`, receiver);
            dispatch({
                type: "ADD_RECEIVER_SUCCESS",
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: "ADD_RECEIVER_FAILED",
                payload: {
                    msg: error.response.data,
                },
            });
        }
    },
    deleteReceivers: (receiverIDs) => async (dispatch) => {
        instance.defaults.headers.common["x_authorization"] = localStorage.getItem(
            localStorageVariable.storeAccessToken
        );
        try {
            const {
                data
            } = await instance.post(`accounts/receivers-delete`, {
                receiverIDs,
            });
            dispatch({
                type: "DELETE_RECEIVERS_SUCCESS",
                payload: data,
            });
        } catch (error) {}
    },
    getPaymentAccounts: () => async (dispatch) => {
        instance.defaults.headers.common["x_authorization"] = localStorage.getItem(
            localStorageVariable.storeAccessToken
        );
        const {
            data
        } = await instance.get("accounts/payment-accounts");
        dispatch({
            type: "GET_PAYMENT_SAVING_ACCOUNTS",
            payload: data,
        });
    },
    getSavingAccounts: () => async (dispatch) => {
        instance.defaults.headers.common["x_authorization"] = localStorage.getItem(
            localStorageVariable.storeAccessToken
        );
        const {
            data
        } = await instance.get("accounts/saving-accounts");
        dispatch({
            type: "GET_PAYMENT_SAVING_ACCOUNTS",
            payload: data,
        });
    },
};

export const transactionAction = {
    getOTP: () => async _ => {
        instance.defaults.headers.common["x_authorization"] = localStorage.getItem(
            localStorageVariable.storeAccessToken
        );
        try {
            const {
                data
            } = await instance.post(`transactions/send-otp`);
            return {
                status: true,
                msg: data
            }

        } catch (error) {
            let msg = 'Có lỗi trong quá trình tạo nhắc nợ!';
            if (error.response) {
                msg = error.response.data;
            }
            return {
                status: false,
                msg
            }
        }
    },
    getInterbankAccount: (accountNumberFromBody) => async (dispatch) => {
        const accountNumber = accountNumberFromBody ?
            accountNumberFromBody :
            "0000000000000";
        instance.defaults.headers.common["x_authorization"] = localStorage.getItem(
            localStorageVariable.storeAccessToken
        );
        try {
            const {
                data
            } = await instance.get(
                `transactions/interbank/accountNumber/${accountNumber}`
            );
            dispatch({
                type: "GET_ACCOUNT",
                payload: data,
            });
        } catch (error) {}
    },
};

export const debtRemindersAction = {
    detail: (_id) => async _ => {
        instance.defaults.headers.common["x_authorization"] = localStorage.getItem(
            localStorageVariable.storeAccessToken
        );
        try {
            const {
                data
            } = await instance.get(`debt-reminders/detail/${_id}`);
            return {
                status: true,
                data
            }
        } catch (error) {
            return {
                status: false
            }
        }
    },
    getCreatingDebtReminders: () => async (dispatch) => {
        instance.defaults.headers.common["x_authorization"] = localStorage.getItem(
            localStorageVariable.storeAccessToken
        );
        try {
            const {
                data
            } = await instance.get(`debt-reminders`);
            dispatch({
                type: "GET_CREATING_DEBT_REMINDERS",
                payload: data,
            });
        } catch (error) {}
    },
    getUnpaidCreatedDebtReminders: () => async dispatch => {
        instance.defaults.headers.common["x_authorization"] = localStorage.getItem(
            localStorageVariable.storeAccessToken
        );
        try {
            const {
                data
            } = await instance.get(`debt-reminders/unpaid-created-debt-reminders`);
            dispatch({
                type: "GET_UNPAID_CREATED_DEBT_REMINDERS",
                payload: data,
            });
        } catch (error) {}
    },
    getPaidCreatedDebtReminders: () => async dispatch => {
        instance.defaults.headers.common["x_authorization"] = localStorage.getItem(
            localStorageVariable.storeAccessToken
        );
        try {
            const {
                data
            } = await instance.get(`debt-reminders/paid-created-debt-reminders`);
            dispatch({
                type: "GET_PAID_CREATED_DEBT_REMINDERS",
                payload: data,
            });
        } catch (error) {}
    },
    createDebtReminders: (debtReminders) => async (dispatch) => {
        instance.defaults.headers.common["x_authorization"] = localStorage.getItem(
            localStorageVariable.storeAccessToken
        );
        try {
            const {
                data
            } = await instance.post(
                `debt-reminders`, debtReminders
            );
            dispatch({
                type: "ADD_DEBT_REMINDERS_SUCCESS",
                payload: data
            });
            return {
                status: true
            }
        } catch (error) {
            let msg = 'Có lỗi trong quá trình tạo nhắc nợ!';
            if (error.response) {
                msg = error.response.data;
            }
            return {
                status: false,
                msg
            }
        }
    },
    removeDebtReminders: (_id, debtContent) => async dispatch => {
        instance.defaults.headers.common["x_authorization"] = localStorage.getItem(
            localStorageVariable.storeAccessToken
        );
        try {
            const body = {
                debtContent
            }
            const {
                data
            } = await instance.post(`debt-reminders/remove-debt-reminders/${_id}`, body);
            dispatch({
                type: "REMOVE_DEBT_REMINDERS_SUCCESS",
                payload: data
            });
            return {
                status: true
            }
        } catch (error) {
            let msg = 'Có lỗi trong quá trình hủy nhắc nợ!';
            if (error.response) {
                msg = error.response.data;
            }
            return {
                status: false,
                msg
            }
        }
    },
    removeCreatedDebtReminders: (_id, debtContent) => async dispatch => {
        instance.defaults.headers.common["x_authorization"] = localStorage.getItem(
            localStorageVariable.storeAccessToken
        );
        try {
            const body = {
                debtContent
            }
            const {
                data
            } = await instance.post(`debt-reminders/remove-created-debt-reminders/${_id}`, body);
            dispatch({
                type: "REMOVE_CREATED_DEBT_REMINDERS_SUCCESS",
                payload: data
            });
            return {
                status: true
            }
        } catch (error) {
            let msg = 'Có lỗi trong quá trình hủy nhắc nợ!';
            if (error.response) {
                msg = error.response.data;
            }
            return {
                status: false,
                msg
            }
        }
    },
    paymentCreatedDebtReminders: (_id, otp, debtContent) => async dispatch => {
        instance.defaults.headers.common["x_authorization"] = localStorage.getItem(
            localStorageVariable.storeAccessToken
        );
        try {
            const {
                data
            } = await instance.post(`debt-reminders/payment-created-debt-reminders/${_id}`, {
                otp,
                debtContent
            });
            dispatch({
                type: "PAYMENT_CREATED_DEBT_REMINDERS_SUCCESS",
                payload: data
            });
            return {
                status: true,
                data
            }
        } catch (error) {
            let msg = 'Có lỗi trong quá trình hủy nhắc nợ!';
            if (error.response) {
                msg = error.response.data;
            }
            return {
                status: false,
                msg
            }
        }
    },
};

const initialState = {
    accessToken: localStorage.getItem(localStorageVariable.storeAccessToken),
    refreshToken: localStorage.getItem(localStorageVariable.storeRefreshToken),
    account: localStorage.getItem(localStorageVariable.storeAccount),
    receivers: [],
    changeReceivers: true,
    payment_savingAccounts: [],
    debtReminders: {
        list: [],
        changeList: true
    },
    unpaidCreatedDebtReminders: {
        list: [],
        changeList: true,
    },
    paidCreatedDebtReminders: {
        list: [],
        changeList: true,
    }
};

export default (state = initialState, action) => {
    if (action.type === "LOGIN_SUCCESS") {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.account = action.payload.account;
        return {
            changeReceivers: true,
            accessToken: action.payload.accessToken,
            refreshToken: action.payload.refreshToken,
            account: action.payload.account,
            debtReminders: {
                changeList: true,
            },
            createdDebtReminders: {
                changeList: true,
            }
        };
    } else if (action.type === "LOGIN_FAILED") {
        return {
            msg: action.payload.msg,
        };
    } else if (action.type === "LOGOUT") {
        return {
            accessToken: null,
            refreshToken: null,
            account: null,
        };
    } else if (action.type === "GET_ACCOUNT") {
        return {
            ...state,
            desAccount: action.payload,
        };
    } else if (action.type === "GET_RECEIVERS") {
        return {
            ...state,
            changeReceivers: false,
            receivers: action.payload,
        };
    } else if (action.type === "ADD_RECEIVER_SUCCESS") {
        const receiver = action.payload;
        return {
            ...state,
            changeReceivers: true,
            receivers: [...state.receivers, receiver],
        };
    } else if (action.type === "ADD_RECEIVER_FAILED") {
        return {
            ...state,
            msg: action.payload.msg,
        };
    } else if (action.type === "DELETE_RECEIVERS_SUCCESS") {
        return {
            ...state,
            changeReceivers: true,
            receivers: action.payload,
        };
    } else if (action.type === "GET_PAYMENT_SAVING_ACCOUNTS") {
        const payment_savingAccounts = action.payload.map((i) => Object.values(i));
        return {
            ...state,
            payment_savingAccounts,
        };
    } else if (action.type === "GET_CREATING_DEBT_REMINDERS") {
        state.debtReminders.changeList = false;
        return {
            ...state,
            debtReminders: {
                list: action.payload,
                changeList: false
            }
        }
    } else if (action.type === "GET_UNPAID_CREATED_DEBT_REMINDERS") {
        state.unpaidCreatedDebtReminders.changeList = false;
        return {
            ...state,
            unpaidCreatedDebtReminders: {
                list: action.payload,
                changeList: false,
            }
        }
    } else if (action.type === "GET_PAID_CREATED_DEBT_REMINDERS") {
        state.paidCreatedDebtReminders.changeList = false;
        return {
            ...state,
            paidCreatedDebtReminders: {
                list: action.payload,
                changeList: false,
            }
        }
    } else if (action.type === "ADD_DEBT_REMINDERS_SUCCESS") {
        return {
            ...state,
            debtReminders: {
                list: [...state.debtReminders.list, action.payload],
            }
        }
    } else if (action.type === "REMOVE_DEBT_REMINDERS_SUCCESS") {
        return {
            ...state,
            debtReminders: {
                list: state.debtReminders.list.map(i => {
                    if (i._id === action.payload._id) {
                        return action.payload;
                    }
                    return i
                }),
            }
        }
    } else if (action.type === "REMOVE_CREATED_DEBT_REMINDERS_SUCCESS") {
        let data = [];
        state.unpaidCreatedDebtReminders.list.map(i => {
            if (i._id !== action.payload._id) {
                data.push(i);
            }
        });
        return {
            ...state,
            unpaidCreatedDebtReminders: {
                list: data,
            }
        }
    } else if (action.type === "PAYMENT_CREATED_DEBT_REMINDERS_SUCCESS") {
        let data = [];
        state.unpaidCreatedDebtReminders.list.map(i => {
            if (i._id !== action.payload.debtReminders._id) {
                data.push(i)
            }
        });
        return {
            ...state,
            unpaidCreatedDebtReminders: {
                list: data
            },
            paidCreatedDebtReminders: {
                list: [...state.paidCreatedDebtReminders.list, action.payload.debtReminders]
            }
        }
    }
    return state;
};