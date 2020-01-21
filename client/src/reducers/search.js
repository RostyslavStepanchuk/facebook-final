import {
  START_SEARCHING,
  STOP_SEARCHING,
  SEARCH_RESULT_RECEIVED,
  START_LOADING,
  STOP_LOADING,
  PROFILE_LOADED
} from '../utils/constants/actionsName'

const initialState = {
  searchResults: [],
  userProfile: {},
  loading: false
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case START_SEARCHING:
    case START_LOADING:
      return { ...state, loading: true }

    case STOP_SEARCHING:
    case STOP_LOADING:
      return { ...state, loading: false }

    case SEARCH_RESULT_RECEIVED:
      return { ...state, searchResults: payload, loading: false }

    case PROFILE_LOADED:
      return { ...state, userProfile: payload, loading: false }

    default:
      return {...state}
  }
}
