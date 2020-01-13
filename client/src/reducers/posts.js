import { POSTS_END_LOADING, POSTS_RECEIVED, POSTS_START_LOADING } from '../utils/constants/actionsName'

const initialState = {
  posts: [],
  loading: false
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case POSTS_START_LOADING:
      return { ...state, loading: true }

    case POSTS_END_LOADING:
      return { ...state, loading: false }

    case POSTS_RECEIVED:
      return { ...state, posts: payload, loading: false }

    default:
      return {...state}
  }
}
