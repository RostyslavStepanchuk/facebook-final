/* global localStorage */

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  RESET_PASSWORD,
  START_LOADING,
  STOP_LOADING,
  EMAIL_CONFIRMED
  // RESET_PASSWORD_FAIL
} from '../utils/constants/actionsName'

const initialState = {
  accessToken: localStorage.getItem('accessToken'),
  isAuthenticated: false,
  loading: false,
  user: null,
  resetEmailSend: false,
  emailIsConfirmed: false
}

export default function(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case START_LOADING:
      return { ...state, loading: true }

    case USER_LOADED:
      return { ...state, isAuthenticated: true, loading: false, user: payload, emailIsConfirmed: payload.emailIsConfirmed }

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('accessToken', payload.accessToken)
      return { ...state, ...payload, isAuthenticated: true, loading: false }

    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem('accessToken')
      return { ...state, accessToken: null, isAuthenticated: false, loading: false }

    case EMAIL_CONFIRMED:
      return { ...state, loading: false, emailIsConfirmed: true }

    case RESET_PASSWORD:
      return { ...state, resetEmailSend: true }

    case STOP_LOADING:
      return { ...state, loading: false }

    default:
      return { ...state }
  }
}
