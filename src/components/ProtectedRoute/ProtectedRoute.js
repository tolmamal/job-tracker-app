import React, { useState } from 'react';
import { Route, Redirect } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from '../../components/Navbar/Navbar';
import { useSelector } from "react-redux";
import { Typography } from "../../utils/Material-UI/components";


const useStyles = makeStyles(() => ({
    root: {
        width: '100%'
    }
}));


const ProtectedRoute = (props) => {
    const classes = useStyles();
    const auth = useSelector((state) => state.auth);
    const {user: {user: {uid} = {}}} = auth;
    const { children } = props;

    const NotVerifiedUser = () => (
        <div>
            <Typography variant="h4" color="primary">
                User Is NOT Verified!
            </Typography>
        </div>
    );

    return (
        <div className={classes.root}>
            {
                uid ? (
                    <Navbar>
                        {' '}
                        {children}
                        {' '}
                    </Navbar>

                ) : <NotVerifiedUser />
            }

        </div>
    );


};

export default ProtectedRoute;
