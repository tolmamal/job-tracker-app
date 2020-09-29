import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Tab, Tabs } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { NavBar } from "../../components";
import { Typography } from "../../utils/Material-UI/components";
import BasicDetails from './BaiscDetails';
import APIService from '../../utils/service/APIService';
import Notes from './Notes/Notes';
import TimeLog from './TimeLog/TimeLog';
import BeatLoader from "react-spinners/BeatLoader";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexGrow: 2,
        width: '100%',
        flexWrap: 'wrap'
    },
    basicDetail: {
        display: 'flex',
        flexDirection: 'column'
    },
    underLine: {
        borderBottom: `2px solid ${theme.palette.primary.main}`,
        display: 'inline-block'
    }
}));

const Loader = () => (
    <BeatLoader
        size={20}
        margin={2}
        color={"#5F9EA0"}
    />
);

const TabPanel = ({index, value, children}) => {
    return (
        <div>
            {index === value && children}
        </div>
    );
};


const ViewJob = (props) => {
    const classes = useStyles();
    const { match } = props;
    const { applicationId } = match.params;
    const {uid} = props.location;
    const [basicDetail, setBasicDetail] = useState({});
    const [tab, setTab] = useState(0);

    const loadData = () => {
        APIService.getApplicationDetails(applicationId, uid)
            .then(response => {
                setBasicDetail({ applicationId, ...response.data });
            })
            .catch(err => console.log(err));
    };

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };

    useEffect(() => {
        if (basicDetail.title === undefined) {
            loadData();
        }
    });

    const Body = () => (
        <div>
            <Tabs
                value={tab}
                indicatorColor="primary"
                textColor="primary"
                onChange={handleTabChange}
                aria-label="View job tabs"
            >
                <Tab label="Basic"/>
                <Tab label="Notes"/>
            </Tabs>
            <TabPanel value={tab} index={0}>
                <div className={classes.root}>
                    <BasicDetails
                        basicDetail={basicDetail}
                        reload={loadData}
                        uid={uid}
                    />
                    <TimeLog
                        uid={uid}
                        basicDetail={basicDetail}
                        reload={loadData}
                    />
                </div>
            </TabPanel>
            <TabPanel value={tab} index={1}>
                <Notes
                    notes={basicDetail.notes}
                    applicationId={applicationId}
                    reload={loadData}
                    uid={uid}
                />
            </TabPanel>
        </div>
    );

    return (
        <div className={classes.root}>
            <NavBar>
                <Typography variant="h6">
                    <NavLink to="/dashboard" className={classes.underLine}>Back</NavLink>
                </Typography>
                {basicDetail.title ? <Body /> : <Loader />}
            </NavBar>
        </div>
    );
};

export default ViewJob;
