import {
  CURRENT_USER_FRIENDS_RECEIVED,
  FRIEND_DELETED,
  FRIEND_SUGGESTIONS_RECEIVED,
  FRIENDS_RECEIVED,
  FRIENDS_STARTED_LOADING,
  FRIENDS_STOPPED_LOADING,
  INCOMING_FRIEND_REQUESTS_RECEIVED,
  REQUEST_CONFIRMED,
  REQUEST_DELETED,
  RESET_FRIEND_SUGGESTIONS,
  RESET_FRIENDS
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
    const friends = await apiRequest.get('/users/friends/' + username, { params: { page, size } })
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

export const loadCurrentUserFriends = (username, page, size) => async dispatch => {
  try {
    const friends = await apiRequest.get('/users/friends/' + username, { params: { page, size } })
    dispatch({
      type: CURRENT_USER_FRIENDS_RECEIVED,
      payload: friends
    })
  } catch (e) {
    Toastr.error('Something goes wrong! Please try again later')
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

export const getFriendSuggestions = size => async dispatch => {
  dispatch({
    type: RESET_FRIEND_SUGGESTIONS
  })

  try {
    const suggestions = await apiRequest.get('/users/friends/suggest', { params: { size } })
    dispatch({
      type: FRIEND_SUGGESTIONS_RECEIVED,
      payload: suggestions
    })
  } catch (e) {
    Toastr.error('Something goes wrong! Please try again later')
  }
}

export const sendFriendRequest = responderId => {
  return apiRequest.post(/requests/ + responderId)
}

export const getIncomingFriendRequests = () => async dispatch => {
  try {
    const requests = await apiRequest.get('/requests')
    dispatch({
      type: INCOMING_FRIEND_REQUESTS_RECEIVED,
      payload: requests
    })
  } catch (e) {
    Toastr.error('Something goes wrong! Please try again later')
  }
}
