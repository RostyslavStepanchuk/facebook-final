import {
  START_SEARCHING,
  END_SEARCHING,
  SEARCH_RESULT_RECEIVED
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
      type: END_SEARCHING
    }))
}
