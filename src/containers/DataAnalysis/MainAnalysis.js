import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Tab, Tabs } from "@material-ui/core";
import { Typography } from "../../utils/Material-UI/components";

import ChartAnalysis from './ChartAnalysis/ChartAnalysis';
import GraphAnalysis from './GraphAnalysis/GraphAnalysis';
import {NavBar} from "../../components";
import {NavLink} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 2,
        width: '100%',
        flexWrap: 'wrap'
    },
}));

const TabPanel = ({index, value, children}) => {
    return (
        <div>
            {index === value && children}
        </div>
    );
};

const MainAnalysis = () => {
    const classes = useStyles();
    const [tab, setTab] = useState(1);

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };

    return (
        <div>
            <NavBar>
                <Typography variant="h6">
                    <NavLink to="/dashboard" className={classes.underLine}>Back</NavLink>
                </Typography>
                <div>
                    <Tabs
                        value={tab}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={handleTabChange}
                        aria-label="Analysis Tabs"
                    >
                        <Tab label="Chart"/>
                        <Tab label="Graph"/>

                    </Tabs>
                    <TabPanel value={tab} index={0}>
                        <ChartAnalysis />
                    </TabPanel>
                    <TabPanel value={tab} index={1}>
                        <GraphAnalysis />
                    </TabPanel>
                </div>
            </NavBar>
        </div>
    );

};


export default MainAnalysis;
