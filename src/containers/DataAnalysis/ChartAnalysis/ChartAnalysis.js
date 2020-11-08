import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { Typography } from "../../../utils/Material-UI/components";

const useStyles = makeStyles((theme) => ({


}));


const ChartAnalysis = props => {
    const classes = useStyles();

    return (
        <div>
            <Typography variant="h3" color="primary">
                Chart Analysis
            </Typography>
        </div>
    );
};

export default ChartAnalysis;
