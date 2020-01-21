import {
  START_SEARCHING,
  END_SEARCHING,
  SEARCH_RESULT_RECEIVED
} from '../utils/constants/actionsName'

const initialState = {
  searchResults: [],
  loading: false
}

export default function(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case START_SEARCHING:
      return { ...state, loading: true }

    case END_SEARCHING:
      return { ...state, loading: false }

    case SEARCH_RESULT_RECEIVED:
      return { ...state, searchResults: payload, loading: false }

    default:
      return {...state}
  }
}
