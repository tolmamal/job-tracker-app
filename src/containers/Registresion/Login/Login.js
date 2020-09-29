import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../store/actions/authActions";
import { Button, Input, Typography } from '../../../utils/Material-UI/components';
import { makeStyles } from "@material-ui/core/styles";
import BeatLoader from "react-spinners/BeatLoader";



const useStyles = makeStyles((theme) => ({
    loginPage: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    },
    loginForm: {
        display: 'flex',
        flexDirection: 'column'
    },
    error: {
        color: 'rgb(201, 58, 58)',
        margin: '8px',
        alignSelf: 'center'
    },
    formContainer: {
        border: '1px solid #dedede',
        padding: '15px 30px',
        boxShadow: '1px 1px 6px #cacaca',
    },
    anchor: {
        margin: '8px'
    },
    span: {
        color: `${theme.palette.primary.main}`,
        cursor: 'pointer'
    }
}));

const Login = () => {
    const history = useHistory();
    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const {isAuthenticated, loginError, loginErrorMsg, isLoggingIn, showLoader} = auth;
    const {user: {user: { displayName } = {}}} = auth;
    if (!error && loginError) {
        setError(loginErrorMsg);
        setLoading(false);
    }
    else if (isAuthenticated && !loggedIn) {
        setLoading(false);
        setLoggedIn(true);
        history.push('/dashboard');
    }
    else if (showLoader && isLoggingIn && !loading) {
        setLoading(true);
    }

    const SubmitHandler = (event) => {
        event.preventDefault();
        dispatch(loginUser(email, password));
        setLoading(false);
    };

    const DisplayLoader = () => (
        <BeatLoader
            size={40}
            margin={2}
            color={"#5F9EA0"}
            loading={loading}
        />
    );

    return (
        <div className={classes.loginPage}>
            {loading ? <DisplayLoader /> :
                <div className={classes.formContainer}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography color="primary" variant="h5" style={{ fontWeight: 'bold' }}>
                            Job Tracker
                        </Typography>
                    </div>
                    <form className={classes.loginForm} onSubmit={SubmitHandler}>
                        <Input
                            type="text"
                            label="email"
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                        <Input
                            type="password"
                            label="password"
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                        <Button name="Login" type="submit">Login</Button>
                        <p className={classes.anchor}>
                            Don't have an account?
                            <span className={classes.span} onClick={() => history.push('/signup')}>
                            {' '}
                                Sign up here
                        </span>
                        </p>
                        <p className={classes.error}>
                            {error}
                        </p>
                    </form>
                </div>
            }
        </div>
    );

};


export default Login;
