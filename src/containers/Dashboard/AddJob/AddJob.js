import React, {useState, useEffect} from 'react';
import { makeStyles } from '../../../utils/Material-UI/import';
import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import { Button, Input } from '../../../utils/Material-UI/components';
import APIService from '../../../utils/service/APIService';
import { StatusMenu } from '../../../components';
import { useToasts } from 'react-toast-notifications';
import DayJsAdapter from '@date-io/dayjs';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { useSelector } from "react-redux";

const filter = createFilterOptions();

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



const AddJob = props => {
    const classes = useStyles();
    const { addToast } = useToasts();
    const { open, onClose, onChange, uid } = props;
    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [status, setStatus] = useState('');
    const notes = [];
    const user = useSelector((state) => state.user);

    const dayJS = new DayJsAdapter();
    const formatedTime = dayJS.format(dayJS.date(new Date()), 'D/M/YYYY');

    const checkValidity = () => {
        if (title && title !== '' && company && company !== '' && status && status !== '') {
            return true;
        }

        return false;
    };

    const renderOptions = () => {
        const {companies = {}} = user;
        const parsed_options = [];
        let temp = companies.filter((val, index) => {
            return companies.indexOf(val) === index;
        });
        for (let key in temp) {
            parsed_options.push({name: temp[key]});
        }

        return parsed_options;

    };

    const submitHandler = (event) => {
        event.preventDefault();
        if (checkValidity()) {
            APIService.addJobApplication(title, status, company, notes, uid, formatedTime)
                .then(() => {
                    onChange();
                    onClose();
                    setTitle('');
                    setCompany('');
                    setStatus('');
                    addToast('Job application saved successfully', {appearance: 'success', autoDismiss: true});
                })
                .catch(err => addToast(err.message, { appearance: 'error', autoDismiss: true }));
        }

    };

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
            <DialogTitle style={{ marginLeft: '8px' }} id="form-dialog-title">Add new job</DialogTitle>
            <DialogContent>
                <form className={classes.mainCard} onSubmit={submitHandler}>
                    <Input
                        type="text"
                        label="title"
                        required
                        onChange={e => setTitle(e.target.value)}
                        value={title}
                    />
                    <Autocomplete className={classes.root}
                                  value={company}
                                  onChange={ (e, newValue) => {
                                      if (typeof newValue === 'string') {
                                          setCompany(newValue);
                                      }
                                      else if (newValue && newValue.inputValue) {
                                          //create new value from user's input
                                          setCompany(newValue.inputValue);
                                      }
                                      else {
                                          if (newValue !== null) {
                                              setCompany(newValue.name)
                                          }
                                          else {
                                              setCompany('');
                                          }
                                      }
                                  }}
                                  filterOptions={(options, params) => {
                                      const filtered = filter(options, params);
                                      //suggest to create a new value
                                      if (params.inputValue !== '') {
                                          filtered.push({
                                              inputValue: params.inputValue,
                                              name: `Add "${params.inputValue}"`,
                                          });
                                      }
                                      return filtered;
                                  }}
                                  selectOnFocus
                                  clearOnBlur
                                  id="search-company-input-box"
                                  options={renderOptions()}
                                  getOptionLabel={(option) => {
                                      //value selected with enter, right from the input
                                      if (typeof option === 'string') {
                                          return option;
                                      }
                                      if (option.inputValue) {
                                          return option.inputValue;
                                      }
                                      // regular option
                                      return option.name;
                                  }}
                                  renderOption={(option) => option.name}
                                  freeSolo
                                  renderInput={(params) => (
                                      <TextField
                                          {...params}
                                          required
                                          label="company"
                                          variant="outlined"
                                          color="primary"
                                      />
                                  )}
                    />
                    <StatusMenu onChange={e => setStatus(e.target.value)} />
                    <Button type="submit">Add</Button>
                </form>
            </DialogContent>
        </Dialog>
    );

};

export default AddJob;
