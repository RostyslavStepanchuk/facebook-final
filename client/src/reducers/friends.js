import {
  FRIEND_DELETED,
  FRIENDS_RECEIVED,
  FRIENDS_STARTED_LOADING,
  FRIENDS_STOPPED_LOADING,
  REQUEST_CONFIRMED,
  RESET_FRIENDS,
  ACTIVE_FRIENDS_RECEIVED
} from '../utils/constants/actionsName'
import { addPagedPayload } from '../utils/helpers/payloadAdapter'

const initialState = {
  userFriends: [],
  activeFriends: [],
  loadingFriends: false,
  loadingActiveFriends: false
}

export default function(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case FRIENDS_STARTED_LOADING:
      return { ...state, loadingFriends: true, loadingActiveFriends: true }

    case FRIENDS_STOPPED_LOADING:
      return { ...state, loadingFriends: false, loadingActiveFriends: false  }

    case FRIENDS_RECEIVED:
      return { ...state,
        userFriends: addPagedPayload(state.userFriends, payload, 'username'),
        loadingFriends: false }

    case ACTIVE_FRIENDS_RECEIVED:
      return { ...state,
        activeFriends: addPagedPayload(state.activeFriends, payload, 'username'),
        loadingActiveFriends: false
      }

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
