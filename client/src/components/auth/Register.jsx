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
    username: '',
    password: '',
    password2: '',
    usernameError: '',
    passwordError: '',
    emailError: ''
  })

  const { username, password, password2, usernameError, passwordError } = formData

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  // todo: refractor needed
  const validate = () => {
    let isError = false
    const errors = {
      usernameError: '',
      passwordError: '',
      emailError: ''
    }

    if (password.length < 6) {
      isError = true
      errors.passwordError = 'Password needs to be atleast 6 characters long'
    }

    if (password !== password2) {
      isError = true
      errors.passwordError = 'Passwords do not match'
    }

    if (username.length < 6) {
      isError = true
      errors.usernameError = 'username needs to be at least 6 characters long'
    }
    setFormData({ ...formData, ...errors })

    return isError
  }

  const onSubmit = async e => {
    e.preventDefault()
    const err = validate()

    if (!err) {
      console.log('username, password', username, password)
      register({ username, password })
    }
  }
  if (isAuthenticated) {
    return <Redirect to='/'/>
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
                autoComplete='username'
                name='username'
                variant='outlined'
                required
                fullWidth
                label='UserName'
                value={username}
                onChange={e => onChange(e)}
                error={!(usernameError === '')}
                helperText={usernameError === '' ? '' : usernameError}
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
  register: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { register })(Register)
