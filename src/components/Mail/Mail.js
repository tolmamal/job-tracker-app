import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "../../utils/Material-UI/components";
import { Button } from "@material-ui/core";
import Icon from '@material-ui/core/Icon';
import { EmailIcon } from "react-share";

const useStyles = makeStyles((theme) => ({
    root: {

    },
    button: {
        margin: theme.spacing(1),
    }
}));


const Mail = () => {
    const classes = useStyles();

    const sendMailHandler = () => {
        console.log("sendMailHandler!");
    };

    return (
        <div>
            <Typography variant="h2" color="primary">
                Page in progress....
            </Typography>
            <br/>
            <br/>
            <br/>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<Icon>send</Icon>}
                onClick={sendMailHandler}
            >
                Send Mail
            </Button>


        </div>
    );
};

export default Mail;
