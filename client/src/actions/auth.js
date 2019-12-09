/* global localStorage */

// TODO: implements alerts
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
  RESET_PASSWORD_FAIL

} from '../utils/constants/actionsName'

// TODO: implemets setting token in headers
import setAuthToken from '../utils/helpers/setAuthToken'

// Load User
// todo: go to api current
// todo: bearer token
// todo: implement setAuthToken

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
    console.error(AUTH_ERROR)
    // dispatch({
    //     type: AUTH_ERROR
    // })
  }
}

// Register User

export const register = ({ userName, email, password }) => async dispatch => {
  console.log(userName, email, password)

//   const config = {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   }

  // Should work without stringify, chek it later

//   const body = { userName, email, password }

  try {
    // const res = await axios.post("/api/users", body, config)

    // dispatch({
    //   type: REGISTER_SUCCESS,
    //   payload: res.data
    // })

    dispatch({
      type: REGISTER_SUCCESS,
      payload: { token: 'JWT dummy token' }
    })

    dispatch(loadUser())
  } catch (err) {
    //   const errors = err.response.data.errors

    //   if(errors) {
    //       errors.forEach(error => dispatch(setAlert(error.msg, "danger")))
    //   }
    dispatch({
      type: REGISTER_FAIL
    })
  }
}

// Login User
// todo: change email to username

export const login = (username, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = { username, password }

  try {
    const res = await axios.post('/api/v1/auth/access-token', body, config)

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    })

    dispatch(loadUser())
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      // errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
      errors.forEach(error => console.log(error.msg, 'danger'))
    }
    dispatch({
      type: LOGIN_FAIL
    })
  }
}

// Logout / Clear Profile

export const logout = () => dispatch => {
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
    //   const res = await axios.post("/api/auth/password_reset", email, config)

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
