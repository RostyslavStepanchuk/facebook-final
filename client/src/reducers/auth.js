/* global localStorage */

import {
  AUTH_ERROR,
  EMAIL_CONFIRMED,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  RESET_PASSWORD,
  START_LOADING,
  STOP_LOADING,
  USER_LOADED
} from '../utils/constants/actionsName'

const initialState = {
  isAuthenticated: true,
  loading: false,
  user: null,
  resetEmailSend: false,
  emailIsConfirmed: false,
}

export default function(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case START_LOADING:
      return { ...state, loading: true }

    case USER_LOADED:
      return { ...state, isAuthenticated: true, loading: false, user: payload, emailIsConfirmed: payload.emailIsConfirmed }

    case REGISTER_SUCCESS:
      localStorage.setItem('accessToken', payload.accessToken)
      return { ...state, isAuthenticated: true }

    case LOGIN_SUCCESS:
      localStorage.setItem('accessToken', payload.accessToken)
      return { ...state, ...payload, isAuthenticated: true, loading: false }

    case REGISTER_FAIL:
      return { ...state, loading: false }

    case AUTH_ERROR:
      localStorage.removeItem('accessToken')
      return { ...state, user: null, isAuthenticated: false, emailIsConfirmed: false, loading: false }

    case LOGIN_FAIL:
      return { ...state, loading: false }

    case LOGOUT:
      localStorage.removeItem('accessToken')
      return { ...state, user: null, isAuthenticated: false, emailIsConfirmed: false, loading: false }

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
