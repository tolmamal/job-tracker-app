import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Board from 'react-trello';
import AddJob from './AddJob/AddJob';
import NavBar from '../../components/Navbar/Navbar';
import { Fab, Divider, Button } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import APIService from '../../utils/service/APIService';
import cloneDeep from 'lodash/cloneDeep';
import { useToasts } from 'react-toast-notifications';
import { useSelector, useDispatch } from "react-redux";
import { saveUserCompanies, saveUserApplications } from '../../store/actions/userActions';
import {
    ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, ExpansionPanelActions
} from "@material-ui/core";
import { Typography } from "../../utils/Material-UI/components";
import { ExpandMore } from "@material-ui/icons";
import clsx from 'clsx';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import Moment from 'moment';
import { extendMoment } from "moment-range";
const moment = extendMoment(Moment);



const data = {
    lanes: [
        {
            id: 'applied',
            title: 'Applied',
            cards: [],
        },
        {
            id: 'inprogress',
            title: 'In Progress',
            cards: []
        },
        {
            id: 'rejected',
            title: 'Rejected',
            cards: []
        },
        {
            id: 'accepted',
            title: 'Accepted',
            cards: []
        },

    ]
};

const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2)
    },
    timeFilterPanel: {
        width: '100%'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        alignItems: 'center',
    },
    column: {
        flexBasis: '33.33%',
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: theme.spacing(1, 2),
    },
    panel: {
        height: '9vh'
    },
    link: {
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    }
}));

const getLane = (lanes, status) => {
    let { cards } = lanes[0];
    if (status === 'applied') {
        cards = lanes[0].cards;
    }
    if (status === 'inprogress') {
        cards = lanes[1].cards;
    }
    if (status === 'rejected') {
        cards = lanes[2].cards;
    }
    if (status === 'accepted') {
        cards = lanes[3].cards;
    }

    return cards;
};


const parseApplicationData = (appData) => {
    const { lanes } = cloneDeep(data);
    for (const application of appData) {
        const {status, id, title, time} = application;
        const {company} = application;
        getLane(lanes, status).push({
            id,
            title: <div style={{paddingTop: '10px', color: '#008B8B' }}>{title}</div>,
            label: time,
            description: company
        });
    }

    return { lanes };
};

const Dashboard = () => {
    const classes = useStyles();
    const history = useHistory();
    const { addToast } = useToasts();
    const [boardData, setBoardData] = useState(data);
    const [openJobAdd, setOpenJobAdd] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [expanded, setExpanded] = useState(false);

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const auth = useSelector((state) => state.auth);
    const {user: {user: {uid} = {}}} = auth;

    const handlePanel = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);

    };

    const handleStartDateChange = (date) => {
        setStartDate(new Date(date));

    };

    const handleEndDateChange = (date) => {
        setEndDate(new Date(date));
    };

    const handleJobAddOpen = () => {
        setOpenJobAdd(true);
    };

    const handleJobAddClose = () => {
        setOpenJobAdd(false);
    };

    const getJobApplications = () => {
        const applications = [];
        let userCompanies = [];
        APIService.getJobApplications(uid)
            .then(res => {
                for (let key in res) {
                    applications.push({
                        ...res[key],
                        id: key
                    });
                }
                const parsedData = parseApplicationData(applications);
                setBoardData(parsedData);
                for (let x in applications) {
                    userCompanies.push(applications[x].company);
                }
                dispatch(saveUserCompanies(uid, userCompanies));
                dispatch(saveUserApplications(uid, applications));
            });

    };

    useEffect(() => {
        getJobApplications();

    }, []);

    const deleteCard = (cardId) => {
        APIService.deleteApplication(cardId, uid)
            .then(addToast('Application deleted', { appearance: 'success', autoDismiss: true }))
            .catch(err => addToast(err.message, { appearance: 'error', autoDismiss: true }));

    };
    const cardClicked = (cardId) => {
        history.push({
            pathname: `/application/${cardId}`,
            uid: uid
        });
    };

    // TODO: if itemsInRange is empty, take care of other display of empty board!
    const handleTimeFilter = () => {
        const itemsInRange = [];
        const {applications = {}} = user;

        const minDate = startDate.setHours(0,0,0);
        const maxDate = endDate.setHours(0,0,0);
        const range = moment.range(minDate, maxDate);

        console.log("minDate: " + moment(minDate).toDate());
        console.log("maxDate: " + moment(maxDate).toDate());
        console.log("range: " + range);

        if (minDate === maxDate) {
            console.log("minDate === maxDate");
        }

        applications.map((item) => {
            if (new Date(item.time) === new Date(minDate)) {
                console.log("YYYYYYYYYYYYYYYY");
            }
            const currentDate = moment(item.time, "DD/MM/YYYY").toDate();
            console.log("currentDate: " + currentDate);

            if (range.contains(currentDate)) {
                itemsInRange.push(item);
            }
        });

        setExpanded(false);
        const parsedData = parseApplicationData(itemsInRange);
        setBoardData(parsedData);
    };

    // const preventDefault = (event) => event.preventDefault();

    return (
        <div>
            <NavBar>
                <div className={classes.timeFilterPanel}>
                    <ExpansionPanel expanded={expanded === 'panel1'} onChange={handlePanel('panel1')}>
                        <ExpansionPanelSummary
                            className={classes.panel}
                            expandIcon={<ExpandMore />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            <div className={classes.column}>
                                <Typography>Date Range Filter</Typography>
                            </div>
                            <div className={classes.column}>
                                <Typography className={classes.secondaryHeading}>Select Dates Range</Typography>
                            </div>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={classes.details}>
                            <div className={clsx(classes.column, classes.helper)}>
                                <Typography variant="caption">
                                    Select your dates
                                    <br />
                                    <br />
                                    <br />
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            autoOk
                                            variant="inline"
                                            inputVariant="outlined"
                                            label="Start-Date"
                                            format="dd/MM/yyyy"
                                            value={startDate}
                                            InputAdornmentProps={{ position: "start" }}
                                            onChange={date => handleStartDateChange(date)}
                                        />
                                    </MuiPickersUtilsProvider>
                                </Typography>
                            </div>

                            <div className={clsx(classes.column, classes.helper)}>
                                <Typography variant="caption">
                                    Select your end date
                                    <br />
                                    <br />
                                    <br />
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            autoOk
                                            variant="inline"
                                            inputVariant="outlined"
                                            label="End-Date"
                                            format="dd/MM/yyyy"
                                            value={endDate}
                                            InputAdornmentProps={{ position: "start" }}
                                            onChange={date => handleEndDateChange(date)}
                                        />
                                    </MuiPickersUtilsProvider>
                                </Typography>
                            </div>
                        </ExpansionPanelDetails>
                        <Divider />
                        <ExpansionPanelActions>
                            <Button size="small" color="black" onClick={handlePanel('panel10')}>Cancel</Button>
                            <Button size="small" color="primary" onClick={handleTimeFilter}>
                                Save
                            </Button>
                        </ExpansionPanelActions>
                    </ExpansionPanel>
                </div>
                <Board
                    data={boardData}
                    style={{ backgroundColor: '#fff', height: 'auto' }}
                    onCardDelete={deleteCard}
                    onCardClick={cardClicked}
                />
            </NavBar>
            <Fab
                color="primary"
                aria-label="Add job"
                className={classes.fab}
                onClick={handleJobAddOpen}
            >
                <Add />

            </Fab>
            <AddJob
                uid={uid}
                open={openJobAdd}
                onClose={handleJobAddClose}
                onChange={getJobApplications}
            />
        </div>
    );
};


export default Dashboard;
