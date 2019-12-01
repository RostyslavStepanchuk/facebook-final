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
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
  })

  const { email, password, emailError, passwordError } = formData

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const validate = () => {
    let isError = false
    const errors = {
      emailError: '',
      passwordError: '',
    }

    if (password.length < 6) {
      isError = true
      errors.passwordError = 'Password needs to be atleast 6 characters long'
    }

    if (!email.match(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/)) {
      isError = true
      errors.emailError = 'Provide valid email'
    }
    setFormData({ ...formData, ...errors })

    return isError
  }

  const onSubmit = async e => {
    e.preventDefault()
    const err = validate()

    if (!err) {
      //   todo: implement login action
      login(email, password)
    }
  }

  // Redirect if loged in

  if (isAuthenticated) {
    return <Redirect to="/" />
    
  }

  return (
    <Container component="main" maxWidth="xs" style={{ height: '80vh' }}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={e => onSubmit(e)}>
          <TextField
            type="input"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={e => onChange(e)}
            error={!(emailError === '')}
            helperText={emailError === '' ? '' : emailError}
          />
          <TextField
            name="password"
            onChange={e => onChange(e)}
            error={!(passwordError === '')}
            helperText={passwordError === '' ? '' : passwordError}
            value={password}
            type="password"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            autoComplete="current-password"
          />
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
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
  login: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps, { login })(Login)
