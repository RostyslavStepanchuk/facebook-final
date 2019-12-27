import React, { useState } from 'react'
import { Avatar, Button, CssBaseline, TextField, Grid, Container, Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './registerStyles'

import { register } from '../../actions/auth'
import Preloader from '../../components/Preloader/Preloader'

const Register = ({ isAuthenticated, loading, register, emailIsConfirmed }) => {
  const classes = useStyles()

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    firstName: '',
    lastName: '',
    usernameError: '',
    passwordError: '',
    repeatPasswordError: '',
    emailError: ''
  })

  const { username,
    email,
    password,
    password2,
    firstName,
    lastName,
    usernameError,
    passwordError,
    repeatPasswordError,
    emailError } = formData

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  // todo: refractor needed
  const validate = () => {
    let isError = false
    const errors = {
      usernameError: '',
      passwordError: '',
      repeatPasswordError: '',
      emailError: ''
    }

    if (password.length < 6) {
      isError = true
      errors.passwordError = 'Password needs to be at least 6 characters long'
    }

    if (password !== password2) {
      isError = true
      errors.repeatPasswordError = 'Passwords do not match'
    }

    if (username.length < 6) {
      isError = true
      errors.usernameError = 'username needs to be at least 6 characters long'
    }

    if (!email.match(/^(\D)+(\w)*((\.(\w)+)?)+@(\D)+(\w)*((\.(\D)+(\w)*)+)?(\.)[a-z]{2,}$/)) {
      isError = true
      errors.emailError = 'email address is required'
    }
    setFormData({ ...formData, ...errors })

    return isError
  }

  const onSubmit = async e => {
    e.preventDefault()
    const err = validate()

    if (!err) {
      register({ email, username, password, firstName, lastName })
    }
  }
  if (isAuthenticated && !emailIsConfirmed) {
    return <Redirect to='/access_denied' />
  }

  if (isAuthenticated && emailIsConfirmed) {
    return <Redirect to='/' />
  }

  return loading ? <Preloader /> : (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={e => onSubmit(e)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete='username'
                name='username'
                variant='outlined'
                required
                fullWidth
                label='username'
                value={username}
                onChange={e => onChange(e)}
                error={!(usernameError === '')}
                helperText={usernameError === '' ? '' : usernameError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete='email'
                name='email'
                variant='outlined'
                required
                fullWidth
                label='email'
                value={email}
                onChange={e => onChange(e)}
                error={!(emailError === '')}
                helperText={emailError === '' ? '' : emailError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                autoComplete='current-password'
                value={password}
                onChange={e => onChange(e)}
                error={!(passwordError === '')}
                helperText={passwordError === '' ? '' : passwordError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password2'
                label='Repeat password'
                type='password'
                autoComplete='current-password'
                value={password2}
                onChange={e => onChange(e)}
                error={!(repeatPasswordError === '')}
                helperText={repeatPasswordError === '' ? '' : repeatPasswordError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete='firstName'
                name='firstName'
                variant='outlined'
                required
                fullWidth
                label='First name'
                value={firstName}
                onChange={e => onChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete='lastName'
                name='lastName'
                variant='outlined'
                required
                fullWidth
                label='Last name'
                value={lastName}
                onChange={e => onChange(e)}
              />
            </Grid>
          </Grid>
          <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
            Sign Up
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              <Link to='/login' variant='body2' className={classes.link}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

Register.propTypes = {
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool.isRequired,
  register: PropTypes.func.isRequired,
  emailIsConfirmed: PropTypes.bool.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  emailIsConfirmed: state.auth.emailIsConfirmed
})

export default connect(mapStateToProps, { register })(Register)
