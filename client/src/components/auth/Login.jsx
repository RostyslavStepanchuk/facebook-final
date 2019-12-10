// todo: change email to username
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { login } from '../../actions/auth'

import { Avatar, Button, TextField, Grid, Typography, Container, CssBaseline } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'

import usestyles from './loginStyles'

const Login = ({ isAuthenticated, login }) => {
  const classes = usestyles()

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    usernameError: '',
    passwordError: ''
  })

  const { username, password, usernameError, passwordError } = formData

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  // todo: refractor needed
  const validate = () => {
    let isError = false
    const errors = {
      usernameError: '',
      passwordError: ''
    }

    if (password.length < 6) {
      isError = true
      errors.passwordError = 'Password needs to be at least 6 characters long'
    }

    if (username.length < 6) {
      isError = true
      errors.usernameError = 'Username needs to be at least 6 characters long'
    }
    setFormData({ ...formData, ...errors })

    return isError
  }

  const onSubmit = async e => {
    e.preventDefault()
    const err = validate()

    if (!err) {
      login({ username, password })
    }
  }

  // Redirect if loged in

  if (isAuthenticated) {
    return <Redirect to='/' />
  }

  return (
    <Container component='main' maxWidth='xs' style={{ height: '80vh' }}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={e => onSubmit(e)}>
          <TextField
            type='input'
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='Username'
            name='username'
            autoComplete='username'
            autoFocus
            value={username}
            onChange={e => onChange(e)}
            error={!(usernameError === '')}
            helperText={usernameError === '' ? '' : usernameError}
          />
          <Grid container >
            <Grid item xs align='right'>
              <Link to='/password_reset' variant='body2' className={classes.link}>
                Forgot password?
              </Link>
            </Grid>
          </Grid>
          <TextField
            name='password'
            onChange={e => onChange(e)}
            error={!(passwordError === '')}
            helperText={passwordError === '' ? '' : passwordError}
            value={password}
            type='password'
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='Password'
            autoComplete='current-password'
          />
          <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to='/register' variant='body2' className={classes.link}>
                Don&apos;t have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

Login.propTypes = {
  isAuthenticated: PropTypes.bool,
  login: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login)
