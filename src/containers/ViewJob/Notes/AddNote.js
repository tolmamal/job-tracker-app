import React, { useState } from 'react';
import { Button, Input } from "../../../utils/Material-UI/components";
import APIService from '../../../utils/service/APIService';
import { makeStyles } from "@material-ui/core/styles";
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import { useToasts } from 'react-toast-notifications';

const useStyles = makeStyles(theme => ({
    form: {
        minWidth: '400px',
        display: 'flex',
        flexDirection: 'column'
    },
    error: {
        color: theme.palette.error.main
    }
}));


const NoteDialog = (props) => {
    const classes = useStyles();
    const { addToast } = useToasts();
    const {
        open, onClose, onChange, applicationId, isNew, title: titleOld, content: contentOld, id, uid
    } = props;

    const [title, setTitle] = useState(isNew ? '' : titleOld);
    const [content, setContent] = useState(isNew ? '' : contentOld);
    const [error, setError] = useState('');

    console.log("NoteDialog -> uid: " + uid);

    const submitHandler = (event) => {
        event.preventDefault();
        if (isNew) {
            APIService.addNotes(applicationId, title, content, uid)
                .then(onChange)
                .catch(() => addToast('Error occurred while adding note', { appearance: 'error', autoDismiss: true }));
        }
        else {
            APIService.updateNote(applicationId, id, title, content, uid)
                .then(onChange)
                .catch(() => addToast('Error occurred while updating note', { appearance: 'error', autoDismiss: true }));
        }
    };

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle style={{ marginLeft: '8px' }} id="form-dialog-title">Add New Note</DialogTitle>
            <DialogContent>
                <form className={classes.form} onSubmit={submitHandler}>
                    <Input
                        type="text"
                        label="title"
                        required
                        onChange={e => setTitle(e.target.value)}
                        value={title}
                    />
                    <Input
                        type="text"
                        label="content"
                        multiline
                        rows="6"
                        required
                        onChange={e => setContent(e.target.value)}
                        value={content}
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

export default NoteDialog;
