/* global localStorage */

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  RESET_PASSWORD
  // RESET_PASSWORD_FAIL
} from '../utils/constants/actionsName'

const initialState = {
  accessToken: localStorage.getItem('accessToken'),
  isAuthenticated: false,
  loading: true,
  user: null,
  resetEmailSend: false
}

export default function(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case USER_LOADED:
      return { ...state, isAuthenticated: true, loading: false, user: payload }

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

    case RESET_PASSWORD:
      return { ...state, resetEmailSend: true }

    default:
      return { ...state }
  }
}
