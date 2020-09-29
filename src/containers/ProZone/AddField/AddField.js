import React, { useState, useEffect } from 'react';
import APIService from '../../../utils/service/APIService';
import { makeStyles } from '../../../utils/Material-UI/import';
import { Button, Input } from "../../../utils/Material-UI/components";
import { Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import { useToasts } from 'react-toast-notifications';

const useStyles = makeStyles((theme) => ({
    mainCard: {
        minWidth: '290px',
        display: 'flex',
        flexDirection: 'column'
    },
    root: {
        margin: theme.spacing(1)
    }

}));


const AddField = props => {
    const classes = useStyles();
    const { addToast } = useToasts();
    const { uid, open, onClose, onChange } = props;
    const [field, setField] = useState('');

    const validField = () => {
        if (field && field !== '') {
            return true;
        }
        return false;
    };

    const submitHandler = (event) => {
        event.preventDefault();
        if (validField()) {
            APIService.addFieldProZone(uid, field, field)
                .then(() => {
                    onChange();
                    onClose();
                    setField('');
                    addToast('New field saved successfully', {appearance: 'success', autoDismiss: true});
                })
                .catch();
        }
    };

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle style={{ marginLeft: '8px' }} id="form-dialog-title">Add new field</DialogTitle>
            <DialogContent>
                <form className={classes.mainCard} onSubmit={submitHandler}>
                    <Input
                        type="text"
                        label="field"
                        required
                        onChange={e => setField(e.target.value)}
                        value={field}
                    />
                    <Button type="submit">Add</Button>
                </form>
            </DialogContent>
        </Dialog>
    );


};

export default AddField;
