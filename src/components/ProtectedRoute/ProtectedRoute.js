import React from 'react';
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({
                            component: Component,
                            isAuthenticated,
                            isVerifying,
                            ...rest
                        }) => {
    return (
        <Route
            {...rest}
            render={props =>
                isVerifying ? (
                    <div/>
                ) : isAuthenticated ? (
                    <Component {...props}/>
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login"
                        }}
                    />
                )
            }
        />
    )
};

export default ProtectedRoute;
