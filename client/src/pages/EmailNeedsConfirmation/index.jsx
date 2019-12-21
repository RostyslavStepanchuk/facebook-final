import React from 'react'
import { Link, useHistory } from 'react-router-dom'

import {CssBaseline, Grid, Paper, Typography} from '@material-ui/core'
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';

import useStyles from './EmailNeedsConfirmationStyles'

const EmailNeedsConfirmation = () => {

    const classes = useStyles();
    const history = useHistory();

    const goBack = e => {
        e.preventDefault();
        history.goBack();
    }

    return (
        <>
            <CssBaseline />
            <Grid container spacing={3} justify='center' alignItems='center' style={{ height: '80vh' }}>
                <Grid item xs={10}>
                    <Paper className={classes.paper}>
                        <Typography variant='h5' color='textPrimary' gutterBottom>
                            <HighlightOffOutlinedIcon color='error' className={classes.icon}/>
                            <p>Please, confirm your email address to continue</p>
                            <p>Follow the link that was sent to your mailbox and <span><Link
                              to="/"
                              variant='inherit'
                              className={classes.link}
                              onClick={goBack}
                            >
                                try again</Link>
                            </span>
                            </p>
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
};


export default EmailNeedsConfirmation;