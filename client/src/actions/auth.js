/* global localStorage */
import axios from 'axios'
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  RESET_PASSWORD,
  RESET_PASSWORD_FAIL,
  START_LOADING
} from '../utils/constants/actionsName'
import setAuthToken from '../utils/helpers/setAuthToken'
import { Toastr } from '../utils/toastr/Toastr'

// Load User

export const loadUser = () => async dispatch => {
  if (localStorage.accessToken) {
    setAuthToken(localStorage.accessToken)
  }

  try {
    const res = await axios.get('/api/v1/users/current')

    dispatch({
      type: USER_LOADED,
      payload: res.data
    })
  } catch (err) {
    Toastr.error(err.response.data)
    dispatch({
      type: AUTH_ERROR
    })
  }
}

// Register User

export const register = (registerData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    dispatch({
      type: START_LOADING
    })

    const res = await axios.post('/api/v1/users', registerData, config)

    Toastr.success('Congrats! Register success!')

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    })

    dispatch(loadUser())
  } catch (err) {
    Toastr.error(err.response.data)
  }
  dispatch({
    type: REGISTER_FAIL
  })
}

// Login User

export const login = ({ username, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = { username, password }

  try {
    dispatch({
      type: START_LOADING
    })

    const res = await axios.post('/api/v1/auth/access-token', body, config)
    Toastr.success('User login')
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    })

    dispatch(loadUser())
  } catch (err) {
    if (err.response.status === 400) {
      Toastr.error('Wrong username or password')
    } else {
      Toastr.error()
    }
    dispatch({
      type: LOGIN_FAIL
    })
  }
}

// Logout / Clear Profile

export const logout = () => dispatch => {
  Toastr.warning('You have just log out')
  dispatch({ type: LOGOUT })
}

// Reset password

export const resetPassword = (email) => dispatch => {
  //   const config = {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   }

  try {
    //   const res = await axios.post("/api/auth/password_reset", emailAddress, config)

    //   dispatch({
    //     type: LOGIN_SUCCESS,
    //     payload: res.data
    //   })
    dispatch({
      type: RESET_PASSWORD
    })
  } catch (err) {
    // const errors = err.response.data.errors

    // if(errors) {
    // errors.forEach(error => dispatch(setAlert(error.msg, "danger")))
    // }
    dispatch({
      type: RESET_PASSWORD_FAIL
    })
  }
}
