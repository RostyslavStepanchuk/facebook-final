// import axios from "axios"

// TODO: implements alerts
// import {setAlert} from "./alert"
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from '../utils/constants/actionsName'

// TODO: implemets setting token in headers
// import setAuthToken from '../utils/setAuthToken'

// Load User

export const loadUser = () => async dispatch => {
  // if(localStorage.token) {
  //     setAuthToken(localStorage.token)
  // }

  try {
    // const res = await axios.get('/api/auth')

    // dispatch({
    //     type: USER_LOADED,
    //     payload: res.data
    // })

    dispatch({
      type: USER_LOADED,
      payload: 'dummy User ID'
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
      payload: {token: 'JWT dummy token'}
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

export const login = (email, password) => async dispatch => {
//   const config = {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   }
//   const body = { email, password }

  try {
    //   const res = await axios.post("/api/auth", body, config)

    //   dispatch({
    //     type: LOGIN_SUCCESS,
    //     payload: res.data
    //   })
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {token: 'JWT dummy token'}
    })

    dispatch(loadUser())
  } catch (err) {
    // const errors = err.response.data.errors

    // if(errors) {
    // errors.forEach(error => dispatch(setAlert(error.msg, "danger")))
    // }
    dispatch({
      type: LOGIN_FAIL
    })
  }
}

// Logout / Clear Profile

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT })
}
