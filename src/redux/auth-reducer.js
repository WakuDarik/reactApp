import apis from "../api/api";

const LOGIN = 'LOGIN';
const SIGNIN = 'SIGNIN';
const ERROR = 'ERROR';
const SIGNOUT = 'SIGNOUT';
const GET_CURRENT_USER = 'GET_CURRENT_USER';

let initialState = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    isAuth: localStorage.getItem('isAuth') === '1' ? 1 : 0,
    errorMsg: '',
};

const authReducer = (state = initialState, action) => {

    switch (action.type) {

        case LOGIN: {
            return {
                ...state,
                ...action.data,
            };
        }
        case SIGNIN: {
            return {
                ...state,
                user: action.user,
                isAuth: action.isAuth
            };
        }
        case SIGNOUT: {
            return {
                ...state,
                user: null,
                isAuth: action.isAuth
            };
        }
        case ERROR: {
            return {
                ...state,
                errorMsg: action.msg,
            };
        }
        default:
            return state;
    }

};

export const signin = (user) => ({ type: SIGNIN, user, isAuth: 1 });
export const logoutUser = () => ({ type: SIGNOUT, isAuth: 0 })
export const errorMsg = (msg) => ({ type: ERROR, msg });
export const currentUser = () => ({ type: GET_CURRENT_USER });

export const registrationUserTC = (data) => (dispatch) => {
    apis.signupAPI(data).then(response => {
        dispatch(signin(response.data));

        console.log(response.data);
    }).catch(function (error) {
        if (error.response) {
            console.log(error.response.status);
            if (error.response.status === 400) {
                dispatch(errorMsg('wrong pass'));
            }
        }
    });
}

export const findUser = (data) => (dispatch) => {
    apis.loginUser(data).then(response => {
        localStorage.setItem('jwtToken', response.data.token);
        dispatch(signin(response.data.user));
        console.log(response);
    }).catch(function (error) {
        if (error.response) {
            console.log(error.response.status);
            if (error.response.status === 400) {
                dispatch(errorMsg('wrong pass'));
            }
        }
    });
}

export const thisUser = () => dispatch => {
    apis.currentUser().then(response => {
        dispatch(currentUser());
        dispatch(signin(response.data.user));
        console.log(response);
    })
}

export const logouyUserTC = () => (dispatch) => {
    localStorage.removeItem('isAuth');
    localStorage.removeItem('user');
    localStorage.removeItem('jwtToken');
    dispatch(logoutUser())
}

export default authReducer;