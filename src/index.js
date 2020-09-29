import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import { ThemeProvider } from './utils/Material-UI/import';
import theme from './utils/Material-UI/theme';
import * as serviceWorker from './serviceWorker';
import { ToastProvider } from 'react-toast-notifications';

// Redux
import { Provider } from 'react-redux';

// Firebase + Firestore
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import firebase from 'firebase/app';
import 'firebase/database';

import createStore from './utils/service/createStore';
import { firebase as fbConfig, reduxFirebase as rfConfig } from "./utils/firebase/config";

firebase.initializeApp(fbConfig);


const initialState = {};
const store = createStore(initialState);


const app = (
    <Provider store={store}>
        <ReactReduxFirebaseProvider
            firebase={firebase}
            config={rfConfig}
            dispatch={store.dispatch}>
            <ThemeProvider theme={theme}>
                <ToastProvider placement='bottom-center' autoDismissTimeout='3000'>
                    <App />
                </ToastProvider>
            </ThemeProvider>
        </ReactReduxFirebaseProvider>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
