/* global localStorage */
import axios from 'axios'
import {
  AUTH_ERROR,
  EMAIL_CONFIRMED,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  RESET_PASSWORD,
  RESET_PASSWORD_FAIL,
  START_LOADING,
  STOP_LOADING,
  USER_LOADED
} from '../utils/constants/actionsName'
import setAuthToken from '../utils/helpers/setAuthToken'
import { Toastr } from '../utils/toastr/Toastr'

// Load User

export const loadUser = () => dispatch => {
  if (localStorage.accessToken) {
    setAuthToken(localStorage.accessToken)

    axios.get('/api/v1/users/current')
      .then(res => {
        dispatch({
          type: USER_LOADED,
          payload: res.data
        })
      })
      .catch(() => {
        setAuthToken(null)
        dispatch({
          type: AUTH_ERROR
        })
      })
  } else {
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

  } catch (err) {
    Toastr.error(err.response.data)

    dispatch({
      type: REGISTER_FAIL
    })
  }
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

// Confirm email

export const confirmEmail = token => dispatch => {
  dispatch({
    type: START_LOADING
  })

  axios.get('/api/v1/users/email/confirm/' + token)
    .then(res => {
      if (res.status === 200) {
        dispatch({
          type: EMAIL_CONFIRMED
        })
      }
    })
    .catch(() => dispatch({
      type: STOP_LOADING
    }))
}
