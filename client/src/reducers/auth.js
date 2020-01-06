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
  EMAIL_CONFIRMED,
  POSTS_LOADED
  // RESET_PASSWORD_FAIL
} from '../utils/constants/actionsName'

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: null,
  resetEmailSend: false,
  emailIsConfirmed: false,
  posts: []
}

export default function(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case START_LOADING:
      return { ...state, loading: true }

    case USER_LOADED:
      return { ...state, isAuthenticated: true, loading: false, user: payload, emailIsConfirmed: payload.emailIsConfirmed }

    case POSTS_LOADED:
      return { ...state, posts: payload }

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
