import React, { useState } from 'react'
import { Avatar, Button, CssBaseline, TextField, Grid, Container, Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { register } from '../../actions/auth'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './registerStyles'

const Register = ({ isAuthenticated, register }) => {
  const classes = useStyles()

  const [formData, setFormData] = useState({
    email: '',
    userName: '',
    password: '',
    password2: '',
    userNameError: '',
    passwordError: '',
    emailError: ''
  })

  const { email, userName, password, password2, userNameError, passwordError, emailError } = formData

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const validate = () => {
    let isError = false
    const errors = {
      userNameError: '',
      passwordError: '',
      emailError: ''
    }

    if (!email.match(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/)) {
      isError = true
      errors.emailError = 'Provide valid email'
    }
    if (password.length < 6) {
      isError = true
      errors.passwordError = 'Password needs to be atleast 6 characters long'
    }

    if (password !== password2) {
      isError = true
      errors.passwordError = 'Passwords do not match'
    }

    if (userName.length < 6) {
      isError = true
      errors.userNameError = 'Username needs to be atleast 6 characters long'
    }
    setFormData({ ...formData, ...errors })
    return isError
  }

  const onSubmit = async e => {
    e.preventDefault()
    const err = validate()
    if (!err) {
      // todo: implement register action
      register(email, userName, password)
    }
  }
  if (isAuthenticated) {
    return <Redirect to='/' />
  }

  return (
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
                autoComplete='email'
                name='email'
                variant='outlined'
                required
                fullWidth
                label='Email'
                autoFocus
                value={email}
                onChange={e => onChange(e)}
                error={!(emailError === '')}
                helperText={emailError === '' ? '' : emailError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete='username'
                name='userName'
                variant='outlined'
                required
                fullWidth
                label='User Name'
                value={userName}
                onChange={e => onChange(e)}
                error={!(userNameError === '')}
                helperText={userNameError === '' ? '' : userNameError}
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
                error={!(passwordError === '')}
                helperText={passwordError === '' ? '' : passwordError}
              />
            </Grid>
          </Grid>
          <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
            Sign Up
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              <Link to='/login' variant='body2'>
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
  register: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { register })(Register)
