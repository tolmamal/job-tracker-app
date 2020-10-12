import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Input } from "../../utils/Material-UI/components";
import { Button } from "@material-ui/core";
import emailjs from 'emailjs-com';

const useStyles = makeStyles((theme) => ({
    content: {
        alignItems: 'center',
        justifyContent: 'center',

    },
    button: {
        margin: theme.spacing(1),
    }
}));

const service_id = 'service_c31keur';
const template_id = 'template_ryptxgx';
const user_id = 'user_F8aQ79apN6EdlSqcIfuii';

const job_title = 'Java Developer';
const company_name = 'Kenshoo';
const link = 'https://www.glassdoor.com/job-listing/java-developer-kenshoo-JV_IC2421096_KO0,14_KE15,22.htm?jl=3699512199&pos=106&ao=78823&s=58&guid=00000174f7d1e7ee892d30b624cbd12a&src=GD_JOB_AD&t=SR&vt=w&uido=2BA1F88F1B312EDEEE2AF8EF106F16B6&cs=1_5ab7f463&cb=1601885562974&jobListingId=3699512199&ctt=1601885688021';



const Mail = () => {
    const classes = useStyles();
    const [email, setEmail] = useState('');

    const sendMailHandler = () => {
        console.log("sendMailHandler!");
        let data = {
            to_email:email,
            job_title: job_title,
            company: company_name,
            link: link,

        };

        emailjs.send(service_id, template_id, data, user_id).then(
            function (response) {
                console.log(response.status, response.text);
            },
            function (err) {
                console.log(err);
            }
        );


    };

    return (
        <div>
            <Typography variant="h2" color="primary">
                Page in progress....
            </Typography>
            <br/>
            <br/>
            <br/>
            <div className={classes.content}>
                <Typography>
                    Enter your mail here:
                    <Input
                        type="text"
                        label="email"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={sendMailHandler}
                    >
                        Send
                    </Button>

                </Typography>
            </div>
        </div>
    );
};

export default Mail;
