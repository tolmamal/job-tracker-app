import React from 'react';
import { makeStyles } from '../../../utils/Material-UI/import';

const useStyles = makeStyles((theme) => ({
    bodyTitle: {
        backgroundColor: '#5F9EA0',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        textAlign: 'center',
        padding: '5vh 0'
    },
    sectionStyle: {
        margin: 'auto',
        width: '60%',
        textAlign: 'center',
        marginTop: theme.spacing(7),
        '@media (max-width : 600px)': {
            width: '95%',
        },
    }
}));

//TODO: add icon or img later
const BodyTitle = (props) => {
    const {className} = props;
    return (
        <div className={className}>
            <h2>Job Tracker</h2>
            <h4>Manage and keep tracking your job applications</h4>

        </div>
    );
};

const BodySectionWrapper = (props) => {
    const {children, className} = props;
    return (
        <div className={className}>
            {children}
        </div>
    );
};

// TODO: keep decorate Home's body
const HomeBody = () => {
    const classes = useStyles();
    return (
        <div>
            <BodyTitle className={classes.bodyTitle} />
            <BodySectionWrapper
                className={classes.sectionStyle}>
                Looking for a job is a job in itself,
                this app was created to make it easier for you. <br />
                Here you can document every job for which you submit a resume. <br />
                There is an option to track every interview, test, or homework assignment you perform.
            </BodySectionWrapper>
            <BodySectionWrapper
                className={classes.sectionStyle}>Wish you best luck!
            </BodySectionWrapper>
        </div>
    );
};

export default HomeBody;
