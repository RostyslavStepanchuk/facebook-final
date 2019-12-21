import React from 'react'
import PropTypes from 'prop-types'
import {CssBaseline, Grid, Paper, Typography} from '@material-ui/core'
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';

import {Link} from 'react-router-dom'

import useStyles from './EmailNeedsConfirmationStyles'

const EmailNeedsConfirmation = props => {

    const classes = useStyles();
    console.log(props);
    const linkUrl = props.continueUrl || "/";

    return (
        <>
            <CssBaseline />
            <Grid container spacing={3} justify='center' alignItems='center' style={{ height: '80vh' }}>
                <Grid item xs={10}>
                    <Paper className={classes.paper}>
                        <Typography variant='h5' color='textPrimary' gutterBottom>
                            <HighlightOffOutlinedIcon color='error' className={classes.icon}/>
                            <p>Please, confirm your email address to continue</p>
                            <p>Follow the link that was sent to your mailbox and <span><Link to={linkUrl} variant='inherit' className={classes.link}>
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

EmailNeedsConfirmation.propTypes = {
    continueUrl: PropTypes.string
};

export default EmailNeedsConfirmation;