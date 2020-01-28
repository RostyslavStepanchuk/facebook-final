import {
  CURRENT_USER_FRIENDS_RECEIVED,
  FRIEND_DELETED,
  FRIEND_SUGGESTIONS_RECEIVED,
  FRIENDS_RECEIVED,
  FRIENDS_STARTED_LOADING,
  FRIENDS_STOPPED_LOADING,
  REQUEST_CONFIRMED,
  RESET_FRIEND_SUGGESTIONS,
  RESET_FRIENDS
} from '../utils/constants/actionsName'
import { addPagedPayload } from '../utils/helpers/payloadAdapter'

const initialState = {
  userFriends: [],
  currentUserFriends: [],
  friendSuggestions: [],
  loading: false
}

export default function (state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case FRIENDS_STARTED_LOADING:
      return { ...state, loading: true }

    case FRIENDS_STOPPED_LOADING:
      return { ...state, loading: false }

    case FRIENDS_RECEIVED:
      return { ...state,
        userFriends: addPagedPayload(state.userFriends, payload, 'username'),
        loading: false }

    case CURRENT_USER_FRIENDS_RECEIVED:
      return { ...state,
        currentUserFriends: addPagedPayload(state.userFriends, payload, 'username')
      }

    case FRIEND_SUGGESTIONS_RECEIVED:
      return { ...state, friendSuggestions: payload }

    case REQUEST_CONFIRMED:
      return { ...state,
        userFriends: state.userFriends.concat(payload) }

    case FRIEND_DELETED:
      return { ...state,
        userFriends: state.userFriends.filter(friend => friend.username !== payload.username)
      }

    case RESET_FRIENDS:
      return { ...state, userFriends: [] }

    case RESET_FRIEND_SUGGESTIONS:
      return { ...state, friendSuggestions: [] }

    default:
      return { ...state }
  }
}
