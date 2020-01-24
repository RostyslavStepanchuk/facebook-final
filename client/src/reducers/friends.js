import {
  FRIEND_DELETED,
  FRIENDS_RECEIVED,
  FRIENDS_STARTED_LOADING,
  FRIENDS_STOPPED_LOADING,
  REQUEST_CONFIRMED,
  RESET_FRIENDS
} from '../utils/constants/actionsName'
import { addPagedPayload } from '../utils/helpers/payloadAdapter'

const initialState = {
  userFriends: [],
  loading: false
}

export default function(state = initialState, action) {
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

    case REQUEST_CONFIRMED:
      return { ...state,
        userFriends: state.userFriends.concat(payload) }

    case FRIEND_DELETED:
      return { ...state,
        userFriends: state.userFriends.filter(friend => friend.username !== payload.username)
      }

    case RESET_FRIENDS:
      return { ...state, userFriends: [] }

    default:
      return { ...state }
  }
}
