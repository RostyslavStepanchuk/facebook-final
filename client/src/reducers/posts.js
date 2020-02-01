import {
  COMMENT_ADDED,
  COMMENT_REMOVED,
  LIKES_UPDATED,
  POST_DELETED,
  POSTS_END_LOADING,
  POSTS_RECEIVED,
  POSTS_START_LOADING,
  RESET_RECEIVED_POSTS,
  TAG_REMOVED
} from '../utils/constants/actionsName'
import { addPagedPayload } from '../utils/helpers/payloadAdapter'

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

    case RESET_RECEIVED_POSTS:
      return { ...state, posts: [] }

    case POSTS_RECEIVED:
      return { ...state,
        posts: addPagedPayload(state.posts, payload, 'id'),
        loading: false
      }

    case LIKES_UPDATED: {
      let result = [...state.posts].map(post => {
        if (post.id === payload.postId) return payload.post
        return post
      })
      return { ...state, posts: result, loading: false }
    }

    case POST_DELETED: {
      let result = [...state.posts].filter(post => post.id !== payload.postId)
      return { ...state, posts: result, loading: false }
    }

    case COMMENT_ADDED: {
      let result = [...state.posts].map(post => {
        if (post.id === payload.postId) return payload.post
        return post
      })
      return { ...state, posts: result, loading: false }
    }

    case COMMENT_REMOVED: {
      let result = [...state.posts].map(post => {
        if (post.id === payload.postId) return payload.post
        return post
      })
      return { ...state, posts: result, loading: false }
    }

    case TAG_REMOVED: {
      let result = [...state.posts].filter(post => post.id !== payload.postId)
      return { ...state, posts: result, loading: false }
    }

    default:
      return {...state}
  }
}
