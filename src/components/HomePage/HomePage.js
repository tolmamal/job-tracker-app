import React from 'react';
import Header from '../HomePage/Header/Header';
import HomeBody from '../HomePage/HomeBody/HomeBody';
import {Redirect} from 'react-router-dom';
import firebase from 'firebase';

const HomePage = () => {

    if (firebase.auth().currentUser) {
        return <Redirect to={'/dashboard'}/>
    }

    return (
        <div>
            <Header/>
            <HomeBody/>
        </div>
    )
};

export default HomePage;
