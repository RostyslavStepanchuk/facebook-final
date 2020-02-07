import {
  TAB_RESET,
  TAB_CHANGED,
  FRIEND_REQUEST_TAB_SELECTED
} from '../utils/constants/actionsName'

export const resetTab = () => dispatch => {
  dispatch({
    type: TAB_RESET
  })
}

export const selectFriendRequestTab = () => dispatch => {
  dispatch({
    type: FRIEND_REQUEST_TAB_SELECTED
  })
}

export const changeTab = value => dispatch => {
  dispatch({
    type: TAB_CHANGED,
    payload: value
  })
}

