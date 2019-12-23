import React, { Fragment } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { CssBaseline, Grid, Paper, Typography } from '@material-ui/core'
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined'

import useStyles from './EmailNeedsConfirmationPageStyles'
import PropTypes from 'prop-types'

const EmailNeedsConfirmationPage = ({ emailIsConfirmed }) => {
  const classes = useStyles()
  const history = useHistory()

  const goBack = e => {
    e.preventDefault()
    history.goBack()
  }

  if (emailIsConfirmed) {
    history.goBack()
  }

  return (
    <Fragment>
      <CssBaseline />
      <Grid container spacing={3} justify='center' alignItems='center' style={{ height: '80vh' }}>
        <Grid item xs={10}>
          <Paper className={classes.paper}>
            <Typography variant='h5' color='textPrimary' gutterBottom>
              <HighlightOffOutlinedIcon color='error' className={classes.icon} />
              <p>Please, confirm your email address to continue</p>
              <p>Follow the link that was sent to your mailbox and <span><Link
                to='/'
                variant='inherit'
                className={classes.link}
                onClick={goBack}>try again</Link>
              </span>
              </p>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  )
}

EmailNeedsConfirmationPage.propTypes = {
  emailIsConfirmed: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  emailIsConfirmed: state.auth.emailIsConfirmed
})

export default connect(mapStateToProps, null)(EmailNeedsConfirmationPage)
