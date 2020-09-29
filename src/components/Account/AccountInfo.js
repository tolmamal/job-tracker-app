import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import NavBar from '../../components/Navbar/Navbar';
import { Typography, Button, Input } from "../../utils/Material-UI/components";
import { makeStyles } from '../../utils/Material-UI/import';
import { useToasts } from 'react-toast-notifications';
import { updatePassword } from "../../store/actions";

const useStyles = makeStyles((theme) => ({
    innerContainer: {
        margin: '6em',
        marginLeft: '5em',
    },
    h2: {
        margin: '0 8px'
    },
    h3: {
        margin: '1em 8px'
    },
    changePassword: {
        marginTop: '2em'
    },
    error: {
        color: theme.palette.error.main
    },
    passwordForm: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '0.5em',
        maxWidth: '40vh'
    },
}));

const ChangePassword = () => {
    const classes = useStyles();
    const { addToast } = useToasts();
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const { passwordUpdated, updateErrorMsg } = auth;

    const [currentPassword, setCurrentPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [passwordChanged, setPasswordChanged] = useState(false);

    const initForm = () => {
        setError('');
        setPassword('');
        setCurrentPassword('');
        setConfirmPassword('');
    };
    if (!error && updateErrorMsg) {
        setError(updateErrorMsg.message);
    }

    else if (passwordChanged && passwordUpdated) {
        addToast('Your password updated successfully', { appearance: 'success', autoDismiss: true });
        setPasswordChanged(false);
        initForm();

    }

    //TODO: need to build function in store that reset user's password
    const submitHandler = (event) => {
        event.preventDefault();
        if (password === confirmPassword) {
            dispatch(updatePassword(password));
            setPasswordChanged(true);
        }
        else {
            setError('Password and confirmation are NOT identical');
        }

    };

    return (
        <div className={classes.changePassword}>
            <Typography variant="h6" color="primary">
                Change Password
            </Typography>
            <form className={classes.passwordForm} onSubmit={submitHandler}>
                <Input
                    type="password"
                    label="current password"
                    required
                    onChange={e => setCurrentPassword(e.target.value)}
                    value={currentPassword}
                />
                <Input
                    type="password"
                    label="password"
                    required
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                />
                <Input
                    type="password"
                    label="confirm password"
                    required
                    onChange={e => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                />
                <Button name="Update password" type="submit">Update</Button>
                <p className={classes.error}>
                    {error}
                </p>
            </form>
        </div>
    );
};


const AccountInfo = () => {
    const classes = useStyles();
    const auth = useSelector((state) => state.auth);
    const {user: {user: {email} = {}}} = auth;
    const {user: {user: {displayName} = {}}} = auth;

    return (
        <NavBar>
            <div className={classes.innerContainer}>
                <Typography variant="h6" color="primary">
                    Account
                </Typography>
                <Typography variant="body1">
                    <b>Email:</b>
                    {' '}
                    {email}
                </Typography>
                <Typography variant="body1">
                    <b>Name:</b>
                    {' '}
                    {displayName}
                </Typography>
                <ChangePassword />
            </div>
        </NavBar>
    );

};

export default AccountInfo;
