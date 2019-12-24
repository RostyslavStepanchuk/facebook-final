import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { get } from 'lodash'
import { CssBaseline, Grid, Paper, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'

import { confirmEmail } from '../../actions/auth'
import useStyles from './EmailConfirmedPageStyles'
import Loading from '../../components/layout/ui-kit/Loading'

const EmailConfirmedPage = props => {
  const classes = useStyles()
  const token = get(props, 'match.params.token')
  const { loading, emailIsConfirmed, confirmEmail } = props

  useEffect(() => confirmEmail(token), [confirmEmail, token])

  const textMessage = emailIsConfirmed
    ? 'Your email was confirmed. Welcome to the club!'
    : 'Something went wrong, your email wasn\'t confirmed'

  const link = <Link to='/' variant='body2' className={classes.link}>Go to your profile</Link>
  return loading ? <Loading /> : (
    <Fragment>
      <CssBaseline />
      <Grid container spacing={3} justify='center' alignItems='center' style={{ height: '80vh' }}>
        <Grid item xs={10}>
          <Paper className={classes.paper}>
            <Typography variant='h5' color='textPrimary' gutterBottom>
              <p>{textMessage}</p>
              {emailIsConfirmed && link}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  )
}

EmailConfirmedPage.propTypes = {
  match: PropTypes.object
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  emailIsConfirmed: state.auth.emailIsConfirmed
})

export default connect(mapStateToProps, { confirmEmail })(EmailConfirmedPage)
