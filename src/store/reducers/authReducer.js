import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    VERIFY_REQUEST,
    VERIFY_SUCCESS,
    SIGNUP_REQUEST,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    UPDATE_REQUEST,
    UPDATE_SUCCESS,
    UPDATE_FAILURE
} from "../actions";


const initialState = {
    isLoggingIn: false,
    isLoggingOut: false,
    isVerifying: false,
    loginError: false,
    loginErrorMsg: null,
    logoutError: false,
    isAuthenticated: false,
    isSignup: false,
    signupError: false,
    signupErrorMsg: null,
    passwordUpdated: false,
    updateErrorMsg: null,
    showLoader: null,
    user: {}

};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_REQUEST:
            return {
                ...state
            };
        case UPDATE_SUCCESS:
            return {
                ...state,
                passwordUpdated: true,
                updateErrorMsg: null
            };
        case UPDATE_FAILURE:
            return {
                ...state,
                passwordUpdated: false,
                updateErrorMsg: action.payload
            };
        case LOGOUT_REQUEST:
            return {
                ...state,
                isLoggingOut: true,
                logoutError: false
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isLoggingOut: false,
                isAuthenticated: false,
                user: {}
            };
        case LOGOUT_FAILURE:
            return {
                ...state,
                isLoggingOut: false,
                logoutError: true
            };
        case SIGNUP_REQUEST:
            return {
                ...state,
                isLoggingIn: true,
                signupError: false
            };

        case SIGNUP_SUCCESS:
            return {
                ...state,
                isSignup: true,
                signupError: false,
                user: action.user
            };

        case SIGNUP_FAILURE:
            return {
                ...state,
                isLoggingIn: false,
                isSignup: false,
                signupError: true,
                signupErrorMsg: action.payload
            };
        case LOGIN_REQUEST:
            return {
                ...state,
                isLoggingIn: true,
                loginError: false,
                showLoader: true
            };

        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggingIn: false,
                isAuthenticated: true,
                user: action.user,
                showLoader: false
            };

        case LOGIN_FAILURE:
            return {
                ...state,
                isLoggingIn: false,
                isAuthenticated: false,
                loginError: true,
                loginErrorMsg: action.payload,
                showLoader: false
            };

        case VERIFY_REQUEST:
            return {
                ...state,
                isVerifying: true,
                verifyingError: false
            };

        case VERIFY_SUCCESS:
            return {
                ...state,
                isVerifying: false
            };

        default:
            return state;
    }

};


export default authReducer;
