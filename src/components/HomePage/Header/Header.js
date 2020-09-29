import React from 'react';
import { Button, AppBar } from '../../../utils/Material-UI/components';
import { makeStyles } from '../../../utils/Material-UI/import';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: '1vh 4vw',
        backgroundColor: 'white'
    },
    headerIcon: {
        width: '55px'
    }
}));

// TODO : pass props to header if user authentication needed here
const Header = () => {
    const classes = useStyles();
    const history = useHistory();

    const HeaderButtons = () => {
        return (
            <div>
                <Button onClick={() => history.push('/signup')}>Sign Up</Button>
                <Button onClick={() => history.push('/login')}>Login</Button>
            </div>
        );
    };

    //TODO: maybe also add LOGO img as well
    return (
        <AppBar position="sticky" className={classes.root}>
            <img
                className={classes.headerIcon}
                src="https://cdn4.iconfinder.com/data/icons/Pretty_office_icon_part_2/256/Briefcase.png"

            />
            <HeaderButtons/>
        </AppBar>
    );


};


export default Header;
