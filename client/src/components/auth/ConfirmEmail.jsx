import React, {useState} from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import {CssBaseline, Grid, Paper, Typography} from '@material-ui/core'
import {Link} from 'react-router-dom'

import useStyles from './ConfirmEmailStyles'

const ConfirmEmail = props => {

    const classes = useStyles();

    const [ emailConfirmed, setEmailConfirmed ] = useState(false);
    const [ isError, setError] = useState(false);
    const token = props.match.params.token;

    axios.get('/api/v1/users/email/confirm/' + token)
        .then(res => {
            if(res.status === 200){
                setEmailConfirmed(true)
            }})
        .catch(() => setError(true));

    let content;
    if (!isError) {
        content = emailConfirmed ? 'Your email was confirmed. Welcome to the club!' : 'Here will be a spinner';
    } else {
        content = 'Something went wrong, your email wasn\'t confirmed';
    }

    const link = <Link to='/' variant='body2' className={classes.link}>Go to your profile</Link>
    return (
        <>
            <CssBaseline />
            <Grid container spacing={3} justify='center' alignItems='center' style={{ height: '80vh' }}>
                <Grid item xs={10}>
                    <Paper className={classes.paper}>
                        <Typography variant='h5' color='textPrimary' gutterBottom>
                            <p>{content}</p>
                            {!isError && emailConfirmed && link}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>

        </>
    );
};

ConfirmEmail.propTypes = {
    match: PropTypes.object
};

export default ConfirmEmail;