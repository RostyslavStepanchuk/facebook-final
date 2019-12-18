import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { resetPassword } from '../../actions/auth'

import { Avatar, Button, TextField, Typography, Container, CssBaseline, Paper } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import usestyles from './resetPasswordStyles'

const ResetPassword = ({ isAuthenticated, resetPassword, resetEmailSend }) => {
  const classes = usestyles()

  const [formData, setFormData] = useState({
    email: '',
    emailError: ''
  })

  let { email, emailError } = formData

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // todo: refractor needed
  const validate = () => {
    let isError = false

    if (!email.match(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/)) {
      isError = true
      emailError = 'Provide valid emailAddress'
    }
    setFormData({ ...formData, emailError })
    console.log(emailError)

    return isError
  }

  const onSubmit = async e => {
    e.preventDefault()
    const err = validate()

    if (!err) {
      //   todo: implement reset password action
      resetPassword(email)
    }
  }

//   Redirect if loged in

  if (isAuthenticated) {
    return <Redirect to='/' />
  }

  return (
    <Container component='main' maxWidth='xs' style={{ height: '80vh' }}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5' className={classes.header}>
          Reset your password
        </Typography>
        {!resetEmailSend ? (
          <Fragment>
            <Typography component='h2' variant='body2'>
              Enter your user account&apos;s verified email and we will send you a password reset link.
            </Typography>
            <form className={classes.form} onSubmit={e => onSubmit(e)}>
              <TextField
                type='input'
                variant='outlined'
                margin='normal'
                required
                fullWidth
                label='Email'
                name='email'
                autoComplete='email'
                autoFocus
                value={email}
                onChange={e => onChange(e)}
                error={!(emailError === '')}
                helperText={emailError === '' ? '' : emailError}
              />
              <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                Send password reset email
              </Button>
            </form>
          </Fragment>
        ) : (
          <Fragment>
            <Typography component='h2' variant='body2'  className={classes.center}>
              Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.
            </Typography>
            <Button fullWidth variant='contained' color='default' className={classes.submit}>
              <Link to='/login' className={classes.link}>
                Return to Log In
              </Link>
            </Button>
          </Fragment>
        )}
      </Paper>
    </Container>
  )
}

ResetPassword.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  resetPassword: PropTypes.func.isRequired,
  resetEmailSend: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  resetEmailSend: state.auth.resetEmailSend
})

export default connect(mapStateToProps, { resetPassword })(ResetPassword)
