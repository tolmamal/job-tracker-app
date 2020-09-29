import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Typography } from '../../../utils/Material-UI/components';
import { signupUser } from "../../../store/actions";
import { makeStyles } from "@material-ui/core/styles";
import validator from 'validator';


const useStyles = makeStyles((theme) => ({
    signUpPage: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    },
    signUpForm: {
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
        boxShadow: '1px 1px 6px #cacaca'
    },
    span: {
        color: `${theme.palette.primary.main}`,
        cursor: 'pointer'
    }
}));

// TODO: add some function that checks all inputs validation
const Signup = () => {
    const history = useHistory();
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    const auth = useSelector(state => state.auth);
    const {isSignup, signupError, signupErrorMsg} = auth;

    if (!error && signupError) {
        setError(signupErrorMsg);
    }
    //TODO: redirect the user to user's account or dashboard - take care!
    else if (isSignup) {
        history.push('/login');
        //history.push('/dashboard');
    }

    const submitHandler = (event) => {
        event.preventDefault();
        if (validator.isAlpha(name)) {
            dispatch(signupUser(email, password, name));
        }
        else {
            setError('Error occurred, check your inputs');
        }

    };
    return (
        <div className={classes.signUpPage}>
            <div className={classes.formContainer}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography color="primary" variant="h5" style={{ fontWeight: 'bold' }}>
                        Job Tracker
                    </Typography>
                </div>
                <form className={classes.signUpForm} onSubmit={submitHandler}>
                    <Input
                        type="text"
                        label="name"
                        onChange={e => setName(e.target.value)}
                        value={name} />
                    <Input
                        type="text"
                        label="email"
                        onChange={e => setEmail(e.target.value)}
                        value={email} />
                    <Input
                        type="password"
                        label="password"
                        onChange={e => setPassword(e.target.value)}
                        value={password} />
                    <Input
                        type="password"
                        label="confirm password"
                        onChange={e => setConfirmPassword(e.target.value)}
                        value={confirmPassword} />
                    <Button name="sign up" type="submit">Sign Up</Button>
                    <p className={classes.anchor}>
                        Already signed up?
                        <span className={classes.span} onClick={() => history.push('/login')}>
                            {' '}
                            Login here
                        </span>
                    </p>
                    <p className={classes.error}>
                        {error}
                    </p>
                </form>
            </div>
        </div>
    );

};

export default Signup;
