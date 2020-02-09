import {
  TAB_RESET,
  TAB_CHANGED,
  FRIEND_REQUEST_TAB_SELECTED
} from '../utils/constants/actionsName'

const initialState = {
  selectedTab: 'timeline'
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case TAB_RESET:
      return { ...state, selectedTab: 'timeline' }

    case FRIEND_REQUEST_TAB_SELECTED:
      return { ...state, selectedTab: 'friend requests' }

    case TAB_CHANGED:
      return { ...state, selectedTab: payload }

    default:
      return { ...state }
  }
}


