import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Input, Button, Typography } from "../../utils/Material-UI/components";
import { StatusMenu } from "../../components";
import APIService from '../../utils/service/APIService';
import { useToasts } from 'react-toast-notifications';
import { TextField } from '../../utils/Material-UI/import';
import { Link } from "@material-ui/core";
import { Route, Redirect } from "react-router-dom";


const useStyles = makeStyles(({
    root: {

    },
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    displayFlex: {
        display: 'flex',
        justifyContent: 'center'
    },
    spaceBetween: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    textField: {
        width: '50%',
        margin: '7px'
    },
    link: {
        textAlign: 'center'
    }
}));

// TODO: add some function that checks input validation for all inputs
const BasicDetails = (props) => {
    const classes = useStyles();
    const { addToast } = useToasts();
    const { basicDetail, reload, uid } = props;
    const [title, setTitle] = useState(basicDetail.title);
    const [companyName, setCompanyName] = useState(basicDetail.company || '');
    const [companyUrl, setCompanyUrl] = useState(basicDetail.company_url || '');
    const [status, setStatus] = useState(basicDetail.status);
    const [description, setDescription] = useState(basicDetail.description || '');
    const [url, setUrl] = useState(basicDetail.url || '');
    const [statusTime, setStatusTime] = useState(basicDetail.time || '');
    const [location, setLocation] = useState(basicDetail.location || '');
    const [updated, setUpdated] = useState(false);

    const submitHandler = (event) => {
        event.preventDefault();
        const jobDetail = {
            title,
            company: companyName,
            company_url: companyUrl,
            status,
            description,
            url,
            time: statusTime,
            location
        };

        APIService.updateJobApplication(basicDetail.applicationId, jobDetail, uid)
            .then(() => {
                addToast('Updated Successfully', { appearance: 'success', autoDismiss: true });
                reload();
                setUpdated(true);
            })
            .catch(() => addToast('Update failed' , { appearance: 'error', autoDismiss: true }));
    };

    const DisplayTime = () => {
        return (
            <TextField className={classes.textField}
                       disabled
                       id="outlined-disabled"
                       variant="outlined"
                       defaultValue={statusTime}
            />
        );
    };

    const DisplayUrl = () => {
        return (
            <Link
                className={classes.link}
                target="_blank"
                rel="noopener noreferrer"
                href={url}>
                Job Post URL
            </Link>
        );
    };

    const DirectToDashboard = () => {
        return (
            <Redirect
                to={{
                    pathname: "/dashboard",
                    state: {from: props.location}
                }}
            />
        );
    };

    return (
        <div className={classes.root}>
            <Typography variant="h6" color="primary">
                Basic Details
            </Typography>
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.spaceBetween}>
                    <Input
                        type="text"
                        label="title"
                        onChange={e => setTitle(e.target.value)}
                        value={title}
                    />
                    <StatusMenu value={status} onChange={e => setStatus(e.target.value)} />
                </div>
                <Input
                    type="text"
                    label="Job post url"
                    onChange={e => setUrl(e.target.value)}
                    value={url}
                />
                {url ? <DisplayUrl/> : null}
                <Input
                    type="text"
                    label="description"
                    multiline
                    rows="4"
                    onChange={e => setDescription(e.target.value)}
                    value={description}
                />
                <Input
                    type="text"
                    label="location"
                    onChange={e => setLocation(e.target.value)}
                    value={location}
                />
                {statusTime !== '' && statusTime !== undefined ? <DisplayTime /> : null}
                <Typography variant="h6" color="primary">
                    Company Details
                </Typography>
                <div className={classes.spaceBetween}>
                    <Input
                        type="text"
                        label="company name"
                        onChange={e => setCompanyName(e.target.value)}
                        value={companyName}
                    />
                    <Input
                        type="text"
                        label="company link"
                        onChange={e => setCompanyUrl(e.target.value)}
                        value={companyUrl}
                    />
                </div>
                <div className={classes.displayFlex}>
                    <Button type="submit" style={{ marginTop: '20px', marginBottom: '5px' }}>Update</Button>
                </div>
            </form>
            {updated ? <DirectToDashboard/> : null}
        </div>
    );
};

export default BasicDetails;