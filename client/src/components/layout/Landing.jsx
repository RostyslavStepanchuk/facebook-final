import React, { Fragment } from 'react'

import { CssBaseline, Typography, Paper, Grid, Button } from '@material-ui/core'
import useStyles from './landingStyles'

const Landing = () => {
  const classes = useStyles()

  return (
    <Fragment>
      <CssBaseline />
      <Grid container spacing={3} justify='center' alignItems='center' style={{ height: '80vh' }}>
        <Grid item xs={10}>
          <Paper className={classes.paper}>
            <Typography variant='h2' component='h1' color='textPrimary' gutterBottom>
              DANBook
            </Typography>
          </Paper>
          <Paper className={classes.paper}>
            <Typography variant='h4' color='textSecondary' gutterBottom>
              This is a Final project of FS-8 Dan.IT group.
            </Typography>
          </Paper>
          <Paper className={classes.paper}>
            <Grid item xs={10} className={classes.btns_container}>
              <Button variant='contained' size='large' color='primary' className={classes.buttons} href='/login'>
                Sign In
              </Button>
              <Button variant='contained' size='large' color='secondary' className={classes.buttons} href='/register'>
                Sign Up
              </Button>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default Landing
