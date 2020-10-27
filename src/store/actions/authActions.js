import firebase from 'firebase/app';
import 'firebase/auth';

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";

export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const UPDATE_REQUEST = "UPDATE_REQUEST";
export const UPDATE_SUCCESS = "UPDATE_SUCCESS";
export const UPDATE_FAILURE = "UPDATE_FAILURE";

const requestLogin = () => {
    return {
        type: LOGIN_REQUEST
    };
};

export const receiveLogin = user => {
    console.log("receiveLogin()");
    return {
        type: LOGIN_SUCCESS,
        user
    };
};


const loginError = (msg) => {
    console.log("authActions/loginError()");
    return {
        type: LOGIN_FAILURE,
        payload: msg
    };
};

const requestSignup = () => {
    return {
        type: SIGNUP_REQUEST
    };
};

const receiveSignup = (user) => {
    return {
        type: SIGNUP_SUCCESS,
        user
    };
};

const signupError = (msg) => {
    return {
        type: SIGNUP_FAILURE,
        payload: msg
    };
};

const verifyRequest = () => {
    return {
        type: VERIFY_REQUEST
    };
};

export const verifySuccess = () => {
    return {
        type: VERIFY_SUCCESS
    };
};

const requestLogout = () => {
    return {
        type: LOGOUT_REQUEST
    };
};

const receiveLogout = () => {
    return {
        type: LOGOUT_SUCCESS
    };
};

const logoutError = () => {
    return {
        type: LOGOUT_FAILURE
    };
};

const updateRequest = () => {
    return {
        type: UPDATE_REQUEST
    };
};

const receiveUpdate = () => {
    return {
        type: UPDATE_SUCCESS
    };
};

const updateError = (err) => {
    return {
        type: UPDATE_FAILURE,
        payload: err
    };
};

export const loginUser = (email, password) => dispatch => {
    console.log("authActions - loginUser()");
    dispatch(requestLogin());
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(user => {
                    dispatch(receiveLogin(user));
                })
                .catch(err => {
                    dispatch(loginError(err.message));
                });
        })
        .catch(err => console.log(err));

};

export const signupUser = (email, password, username) => dispatch =>  {
    console.log("authActions - signupUser()");
    dispatch(requestSignup());
    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => {
            console.log(user);
            dispatch(receiveSignup(user));
            const currentUser = firebase.auth().currentUser;
            currentUser.updateProfile({
                displayName: username
            });
        })
        .catch(err => {
            dispatch(signupError(err.message));
        });
};

export const logoutUser = () => dispatch => {
    dispatch(requestLogout());
    firebase
        .auth()
        .signOut()
        .then(() => {
            dispatch(receiveLogout());
        })
        .catch(err => {
            dispatch(logoutError());
        });
};

export const updatePassword = (newPassword) => dispatch => {
    dispatch(updateRequest());
    const user = firebase.auth().currentUser;
    user.updatePassword(newPassword)
        .then(res => {
            dispatch(receiveUpdate());
        })
        .catch(err => {
            console.log("err: " + err);
            dispatch(updateError(err));
        });
};

export const verifyAuth = () => dispatch => {
    dispatch(verifyRequest());
    firebase
        .auth()
        .onAuthStateChanged(user => {
            if (user !== null) {
                dispatch(receiveLogin(user));
            }
            dispatch(verifySuccess());
        });
};
