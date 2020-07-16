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
        } catch (error) {}
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
        } catch (error) {
            let msg = 'Có lỗi trong quá trình tạo nhắc nợ!';
            if (error.response) {
                msg = error.response.data;
            }
            dispatch({
                type: "ADD_DEBT_REMINDERS_FAILED",
                payload: {
                    msg
                }
            });
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
    getCreatedDebtReminders: () => async dispatch => {
        instance.defaults.headers.common["x_authorization"] = localStorage.getItem(
            localStorageVariable.storeAccessToken
        );
        try {
            const {
                data
            } = await instance.get(`debt-reminders/created-debt-reminders`);
            dispatch({
                type: "GET_CREATED_DEBT_REMINDERS",
                payload: data,
            });
        } catch (error) {}
    }
};

let newCreatedDebtReminders = false;
const getNewCreatedDebtReminders = () => {
    if (typeof EventSource === "undefined") {
        console.log("not support");
        return;
    }

    var src = new EventSource(
        `${process.env.REACT_APP_BASE_BACKEND_URL}debt-reminders/debt-reminders-add-event`
    );

    src.onerror = function (e) {
        console.log("error: " + e);
    };

    src.addEventListener("DEBT_REMINDERS_ADDED", function (e) {
            const data = JSON.parse(e.data);
            // newCreatedDebtReminders = {
            //     _id: data._id,
            //     desAccountNumber: data.accountNumber,
            //     desAccountName: data.accountName,
            //     debtMoney: data.debtMoney,
            //     debtContent: data.debtContent,
            //     datetime: data.datetime,
            //     status: data.isPay
            // };
            newCreatedDebtReminders = true;
        },
        false
    );
}
// getNewCreatedDebtReminders();
export const isChange = newCreatedDebtReminders;

const initialState = {
    accessToken: localStorage.getItem(localStorageVariable.storeAccessToken),
    refreshToken: localStorage.getItem(localStorageVariable.storeRefreshToken),
    account: localStorage.getItem(localStorageVariable.storeAccount),
    receivers: [],
    changeReceivers: true,
    payment_savingAccounts: [],
    debtReminders: {
        msg: '',
        list: [],
        changeList: true
    },
    createdDebtReminders: {
        msg: '',
        list: [],
        changeList: true,
        newCreatedDebtReminders
    }
};

export default (state = initialState, action) => {
    state.createdDebtReminders.newCreatedDebtReminders = newCreatedDebtReminders;
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
    } else if (action.type === "GET_CREATED_DEBT_REMINDERS") {
        state.createdDebtReminders.changeList = false;
        return {
            ...state,
            createdDebtReminders: {
                list: action.payload,
                changeList: false,
            }
        }
    } else if (action.type === "ADD_DEBT_REMINDERS_SUCCESS") {
        return {
            ...state,
            debtReminders: {
                list: [...state.debtReminders.list, action.payload],
            },
            createdDebtReminders:{
                list:[...state.createdDebtReminders.list, newCreatedDebtReminders]
            }
        }
    } else if (action.type === "ADD_DEBT_REMINDERS_FAILED") {
        return {
            ...state,
            debtReminders: {
                msg: action.payload.msg
            }
        }
    }
    return state;
};