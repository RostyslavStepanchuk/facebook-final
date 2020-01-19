import apiRequest from '../utils/helpers/apiRequest'

import {
  AUTH_ERROR,
  EMAIL_CONFIRMED,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  PASSWORD_RESET,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  START_LOADING,
  STOP_LOADING,
  USER_LOADED,
  REQUEST_DELETED,
  REQUEST_CONFIRMED
} from '../utils/constants/actionsName'
import { Toastr } from '../utils/toastr/Toastr'

// Load User

export const loadUser = () => dispatch => {
  dispatch({
    type: START_LOADING
  })

  apiRequest.get('/users/current')
    .then(data => {
      // todo: resolve reflecting users without avatars issue
      // temporary step to avoid crushing script without images for new user
      // next task I am going to do is to fix this for all occasions
      if (!data.avatar) {
        data.avatar = { src: '/images/no-avatar.png' }
      }

      if (!data.profileCover) {
        data.profileCover = { src: '/images/profile-cover-placeholder.jpg' }
      }

      dispatch({
        type: USER_LOADED,
        payload: data
      })
    })
    .catch(() => {
      dispatch({
        type: AUTH_ERROR
      })
    })
}

// Register User

export const register = (registerData) => async dispatch => {
  try {
    dispatch({
      type: START_LOADING
    })

    const data = await apiRequest.post('/users', registerData, {}, false)

    Toastr.success('Congrats! Register success!')
    apiRequest.rememberUser(data.accessToken)
    dispatch({
      type: REGISTER_SUCCESS
    })
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL
    })
  }
}

// Login User

export const login = ({ username, password }) => async dispatch => {
  const body = { username, password }

  try {
    dispatch({
      type: START_LOADING
    })

    const data = await apiRequest.post('/auth/access-token', body, {}, false)
    Toastr.success('User logged in')
    apiRequest.rememberUser(data.accessToken)
    dispatch({
      type: LOGIN_SUCCESS
    })
  } catch (err) {
    if (err.status === 400) {
      Toastr.error('Wrong username or password')
    }
    dispatch({
      type: LOGIN_FAIL
    })
  }
}

// Logout / Clear Profile

export const logout = () => dispatch => {
  apiRequest.forgetUser()
  dispatch({ type: LOGOUT })
}

// Reset password

export const resetPassword = email => async dispatch => {
  dispatch({ type: START_LOADING })

  try {
    await apiRequest.post('/users/reset_password', { email }, null, false)
    dispatch({ type: PASSWORD_RESET })
  } catch (e) {
    dispatch({ type: STOP_LOADING })
  }
}

export const setNewPassword = (password, token) => async dispatch => {
  dispatch({ type: START_LOADING })

  try {
    await apiRequest.post('/users/set_new_password/' + token, { password }, null, false)
    dispatch({ type: STOP_LOADING })
    return true
  } catch (e) {
    dispatch({ type: STOP_LOADING })
    return false
  }
}

// Confirm email

export const confirmEmail = token => dispatch => {
  dispatch({
    type: START_LOADING
  })

  apiRequest.get('/users/email/confirm/' + token, {}, false)
    .then(() => dispatch({
      type: EMAIL_CONFIRMED
    }))
    .catch(() => dispatch({
      type: STOP_LOADING
    }))
}

export const updateProfile = dataForm => dispatch => {
  return apiRequest.put('/users', dataForm)
    .then(data => {
      console.log('userUpdateResponded')
      dispatch({
        type: USER_LOADED,
        payload: data
      })
    })
}

export const confirmRequest = (requestId) => async dispatch => {
  try {
    const user = await apiRequest.put('/requests/' + requestId)
    dispatch({
      type: REQUEST_CONFIRMED,
      payload: user
    })
  } catch (e) {
    console.log(e)
  }
}

export const deleteRequest = (requestId) => async dispatch => {
  try {
    const requestList = await apiRequest.delete('/requests/' + requestId)
    dispatch({
      type: REQUEST_DELETED,
      payload: requestList
    })
  } catch (e) {
    console.log(e)
  }
}

