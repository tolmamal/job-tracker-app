import React, { useState } from 'react';
import APIService from '../../../utils/service/APIService';
import { Button, Input, Select } from "../../../utils/Material-UI/components";
import { Dialog, DialogContent, DialogTitle, MenuItem } from "@material-ui/core";
import { DateTimePicker } from "@material-ui/pickers";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
    error: {
        color: theme.palette.error.main,
    },
    form: {
        minWidth: '400px',
        display: 'flex',
        flexDirection: 'column'
    }
}));

const TimeDialog = (props) => {
    const classes = useStyles();
    const {open, onClose, onChange, applicationId, isNew, time: timeO, note: noteO, type: typeO, timeLogId, uid} = props;
    const [type, setType] = useState(isNew ? '' : typeO);
    const [note, setNote] = useState(isNew ? '' : noteO);
    const formatedTime = isNew ? new Date() : new Date(timeO);
    const [time, setTime] = useState(formatedTime);
    const [error, setError] = useState('');


    const submitHandler = (event) => {
        event.preventDefault();
        console.log("TimeDialog - submitHandler()");
        if (isNew && uid !== undefined) {
            APIService.addTimeLog(applicationId, type, time, note, uid)
                .then(onChange)
                .catch(() => setError('Error in adding Time Log'));
        }
        else if (!isNew && uid !== undefined) {
            APIService.updateTimeLog(applicationId, timeLogId, type, time, note, uid)
                .then(onChange)
                .catch(() => setError('Error in updating Time Log'));
        }
    };

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="Add time log">
            <DialogTitle style={{ marginLeft: '8px' }} id="add-title">Add Time Log</DialogTitle>
            <DialogContent>
                <form className={classes.form} onSubmit={submitHandler}>
                    <Select label="Type" value={type} onChange={e => setType(e.target.value)}>
                        <MenuItem value="applied">Applied</MenuItem>
                        <MenuItem value="interview">Interview</MenuItem>
                        <MenuItem value="accepted">Accepted</MenuItem>
                        <MenuItem value="rejected">Rejected</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                    </Select>
                    <DateTimePicker
                        style={{ margin: '8px' }}
                        label="Event time"
                        inputVariant="outlined"
                        variant="inline"
                        value={time}
                        onChange={setTime}
                        format="MMMM D, YYYY HH:mm"
                    />
                    <Input
                        type="text"
                        label="Note"
                        multiline
                        rows="6"
                        onChange={e => setNote(e.target.value)}
                        value={note}
                    />
                    <Button type="submit">{isNew ? 'Add' : 'Update'}</Button>
                    <p className={classes.error}>
                        {error}
                    </p>
                </form>
            </DialogContent>
        </Dialog>
    );

};

export default TimeDialog;
