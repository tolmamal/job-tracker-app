import authReducer from './authReducer';
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import userReducer from './userReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer,
    user: userReducer
});

export default rootReducer;
