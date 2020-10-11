import React from 'react';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/actions";
import { makeStyles } from '../../utils/Material-UI/import';
import { Divider, List } from "../../utils/Material-UI/components";
import ListItemWithLink from '../UI/ListItemWithLink/ListItemWithLink';
import ListItemWithClick from '../UI/ListItemWithClick/ListItemWithClick';

//icons
import { Logo } from '../../assets/icons';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import { AssessmentOutlined } from "@material-ui/icons";
import ExitToAppOutlined from '@material-ui/icons/ExitToAppOutlined';
import WorkIcon from "@material-ui/icons/Work";

const useStyles = makeStyles((theme) => ({
    nav: {
        top: '0',
        left: '0',
        zIndex: '1',
        height: '100vh',
        width: '180px',
        position: 'fixed',
        backgroundColor: '#f1f1f1'
    },
    logo: {
        margin: theme.spacing(2.5),
        width: '40px'
    },
    textStyle: {
        color: theme.palette.textPrimary,
        fontWeight: '500'
    },
    logoDiv: {
        display: 'flex',
        justifyContent: 'center'
    },
    container: {
        overflow: 'auto',
        width: '100%',
        marginLeft: '180px'
    },
    root: {
        width: '100%',
        display: 'flex',
        alignItems: 'stretch'
    },
}));

const NavBar = props => {
    const classes = useStyles();
    const {children} = props;
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const { isLoggingOut, isAuthenticated } = auth;
    const {user: {user: {uid} = {}}} = auth;

    if (isLoggingOut === false && isAuthenticated === false && uid === undefined) {
        document.location = '/';
    }

    const logout = () => {
        dispatch(logoutUser());

    };

    return (
        <div className={classes.root}>
            <nav className={classes.nav}>
                <div className={classes.logoDiv}>
                    <NavLink to="/">
                        <img src={Logo} alt="logo" className={classes.logo}/>
                    </NavLink>
                </div>
                <Divider />
                <List component="ul">
                    <ListItemWithLink
                        primary="Dashboard"
                        to="/dashboard"
                        textOverrideClass={{ primary: classes.textStyle }}
                        icon={<DashboardOutlinedIcon />}
                    />
                    <ListItemWithLink
                        primary="Self Analysis"
                        to="/analysis"
                        textOverrideClass={{ primary: classes.textStyle }}
                        icon={<AssessmentOutlined />}
                    />
                    <ListItemWithLink
                        primary="Pro Zone"
                        to="/pro-zone"
                        textOverrideClass={{ primary: classes.textStyle }}
                        icon={<WorkIcon />}
                    />
                    <ListItemWithLink
                        primary="Account"
                        to="/account"
                        textOverrideClass={{ primary: classes.textStyle }}
                        icon={<SettingsOutlinedIcon />}
                    />

                    {/*<ListItemWithLink*/}
                    {/*    primary="Send Mail"*/}
                    {/*    to="/send-mail"*/}
                    {/*    textOverrideClass={{ primary: classes.textStyle }}*/}
                    {/*    icon={<Email />}*/}
                    {/*/>*/}

                    <ListItemWithClick
                        primary="Logout"
                        onClick={logout}
                        textOverrideClass={{ primary: classes.textStyle }}
                        icon={<ExitToAppOutlined />}
                    />


                </List>
            </nav>
            <div className={classes.container}>
                {children}
            </div>
        </div>

    );
};

export default NavBar;
