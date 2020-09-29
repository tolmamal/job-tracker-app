import React, { useState } from 'react';
import { withStyles, makeStyles } from "@material-ui/core";
import { Typography, Button } from "../../../utils/Material-UI/components";
import { Paper, IconButton, Tooltip } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DayJsAdapter from '@date-io/dayjs';
import APIService from '../../../utils/service/APIService';
import TimeLogForm from './AddTimeLog';


const useStyles = makeStyles(({
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    displayFlex: {
        display: 'flex',
        justifyContent: 'center'
    },
    root: {
        minWidth: '60%',
        paddingLeft: '5px'
    },
    timeLogItem: {
        margin: '5px',
        display: 'flex',
        flexWrap: 'wrap'
    }
}));

const StyleTooltip = withStyles((theme) => ({
    arrow: {
        color: theme.palette.common.black
    },
    tooltip: {
        backgroundColor: theme.palette.common.black,
        fontSize: 16
    }
}))(Tooltip);


const TimeLogItem = (props) => {
    const classes = useStyles();
    const { note, time, type, applicationId, id, onUpdate, uid } = props;
    const [openAddTimeLog, setOpenAddTimeLog] = useState(false);
    const dayJS = new DayJsAdapter();
    const formatedTime = dayJS.format(dayJS.date(time), 'MMMM D, YYYY HH:mm');

    const deleteTimelogHandler = () => {
        APIService.deleteTimeLog(applicationId, id, uid)
            .then(onUpdate);

    };

    const handleAddTimeLogOpen = () => {
        setOpenAddTimeLog(true);
    };

    const handleAddTimeLogClose = () => {
        setOpenAddTimeLog(false);
    };

    const FormatedNote = React.forwardRef((innerProps, ref) => (
        <div {...innerProps} ref={ref}>
            <Typography variant="body2">
                {note.length > 35 ? `${note.substring(0, 37)}...` : note}
            </Typography>
        </div>
    ));

    return (
        <Paper className={classes.timeLogItem} elevation={3}>
            <Typography variant="body2" style={{ width: '10%' }}>
                {type}
            </Typography>
            <Typography variant="body2" style={{ width: '20%' }}>
                {formatedTime}
            </Typography>
            <StyleTooltip title={note} style={{ width: '40%' }} arrow placement="top">
                <FormatedNote />
            </StyleTooltip>
            <div className={classes.displayFlex} style={{ justifyContent: 'space-between' }}>
                <IconButton aria-label="Delete time log" component="span" onClick={deleteTimelogHandler}>
                    <Delete color="error"/>
                </IconButton>
                <IconButton aria-label="Edit time log" component="span" onClick={handleAddTimeLogOpen}>
                    <Edit color="primary"/>
                </IconButton>
            </div>
            <TimeLogForm
                uid={uid}
                open={openAddTimeLog}
                onClose={handleAddTimeLogClose}
                onChange={onUpdate}
                applicationId={applicationId}
                timeLogId={id}
                time={time}
                note={note}
                type={type}
            />
        </Paper>
    );
};

const EmptyLogView = () => {
    const classes = useStyles();
    return (
        <div className={classes.displayFlex}>
            <Typography variant="h5">
                No Time Logs Added
            </Typography>
        </div>
    );
};


const TimeLog = (props) => {
    const classes = useStyles();
    const {uid, basicDetail, reload} = props;
    const {applicationId} = basicDetail;
    const { timelogs = {} } = basicDetail;
    const [openAddTimeLog, setOpenAddTimeLog] = useState(false);
    const timelogsLength = Object.keys(timelogs).length;

    const handleAddTimeLogOpen = () => {
        setOpenAddTimeLog(true);
    };

    const handleAddTimeLogClose = () => {
        setOpenAddTimeLog(false);
    };

    const LoadTimeLogs = () => {
        const timelogsItems = [];
        for (let key in timelogs) {
            timelogsItems.push({
                ...timelogs[key],
                id: key
            });
        }
        return (
            timelogsItems.map(timelog => (
                <TimeLogItem
                    uid={uid}
                    applicationId={applicationId}
                    type={timelog.type}
                    note={timelog.note}
                    time={timelog.time}
                    id={timelog.id}
                    key={timelog.id}
                    onUpdate={reload}
                />
            ))
        );
    };

    return (
        <MuiPickersUtilsProvider utils={DayJsAdapter}>
            <div className={classes.root}>
                <Typography variant="h6" color="primary">
                    Time Log
                </Typography>
                {timelogsLength === undefined || timelogsLength === 0 ? <EmptyLogView /> : <LoadTimeLogs />}
                {/*{timelogs.length !== 0 && timelogs.length !== undefined ? <LoadTimeLogs /> : ''}*/}
                <div className={classes.displayFlex}>
                    <Button onClick={handleAddTimeLogOpen}>Add</Button>
                </div>
                <TimeLogForm
                    open={openAddTimeLog}
                    onClose={handleAddTimeLogClose}
                    onChange={reload}
                    applicationId={applicationId}
                    isNew
                    uid={uid}
                />
            </div>
        </MuiPickersUtilsProvider>
    );
};

export default TimeLog;
