import React from 'react';
import { Typography } from "../../utils/Material-UI/components";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
    }
}));


const TestContainer = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Typography variant="h1" color="primary">
                Test Container - only check Protected Route
            </Typography>

        </div>
    );
};

export default TestContainer;
