import {
  START_SEARCHING,
  STOP_SEARCHING,
  SEARCH_RESULT_RECEIVED,
  START_LOADING,
  STOP_LOADING,
  PROFILE_LOADED
} from '../utils/constants/actionsName'

import apiRequest from '../utils/helpers/apiRequest'

export const searchData = query => async dispatch => {
  dispatch({
    type: START_SEARCHING
  })

  apiRequest.get(`/users/users_search/${query}`, null, true)
    .then(res => {
      dispatch({
        type: SEARCH_RESULT_RECEIVED,
        payload: res
      })
    }
      )
    .catch(() => dispatch({
      type: STOP_SEARCHING
    }))
}

export const getUserProfile = userId => async dispatch => {
  dispatch({
    type: START_LOADING
  })

  apiRequest.get(`/users/${userId}`, null, true)
    .then(res => {
      dispatch({
        type: PROFILE_LOADED,
        payload: res
      })
    }
    )
    .catch(() => dispatch({
      type: STOP_LOADING
    }))
}
