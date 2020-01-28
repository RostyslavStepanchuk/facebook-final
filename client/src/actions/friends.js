import {
  FRIEND_DELETED,
  FRIENDS_RECEIVED,
  FRIENDS_STARTED_LOADING,
  FRIENDS_STOPPED_LOADING,
  REQUEST_CONFIRMED,
  REQUEST_DELETED,
  RESET_FRIENDS,
  ACTIVE_FRIENDS_RECEIVED
} from '../utils/constants/actionsName'
import apiRequest from '../utils/helpers/apiRequest'
import { Toastr } from '../utils/toastr/Toastr'

export const loadUserFriends = (username, page, size, isInitialRequest) => async dispatch => {
  dispatch({
    type: FRIENDS_STARTED_LOADING
  })

  if (isInitialRequest) {
    dispatch({
      type: RESET_FRIENDS
    })
  }

  try {
    const friends = await apiRequest.get('/users/friends', { page, size })
    dispatch({
      type: FRIENDS_RECEIVED,
      payload: friends
    })
  } catch (e) {
    dispatch({
      type: FRIENDS_STOPPED_LOADING
    })
  }
}

export const deleteFriend = friendUsername => async dispatch => {
  try {
    const user = await apiRequest.delete('/users/friends/' + friendUsername)
    dispatch({
      type: FRIEND_DELETED,
      payload: user
    })
  } catch (e) {
    Toastr.error('Something goes wrong! Please try again later')
  }
}

export const confirmRequest = (requestId) => async dispatch => {
  try {
    const newFriend = await apiRequest.put('/requests/' + requestId)
    dispatch({
      type: REQUEST_CONFIRMED,
      payload: newFriend
    })
  } catch (e) {
    Toastr.error('Something goes wrong! Please try again later')
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
    Toastr.error('Something goes wrong! Please try again later')
  }
}

export const loadActiveFriends = (page, size, isInitialRequest) => async dispatch => {
  // dispatch({
  //   type: FRIENDS_STARTED_LOADING
  // })
  //
  // if (isInitialRequest) {
  //   dispatch({
  //     type: RESET_FRIENDS
  //   })
  // }

  try {
    const activeFriends = await apiRequest.get('/users/friends/active', { page, size })
    dispatch({
      type: ACTIVE_FRIENDS_RECEIVED,
      payload: activeFriends
    })
  } catch (e) {
    // dispatch({
    //   type: FRIENDS_STOPPED_LOADING
    // })
  }
}
