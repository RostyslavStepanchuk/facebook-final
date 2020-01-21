import {
  COMMENT_ADDED,
  COMMENT_REMOVED,
  LIKES_UPDATED,
  POST_DELETED,
  POSTS_END_LOADING,
  POSTS_RECEIVED,
  POSTS_START_LOADING,
  RESET_RECEIVED_POSTS
} from '../utils/constants/actionsName'

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
      const overlapIndex = state.posts.map(post => post.id)
        .indexOf(payload[0].id)
      let updatedPosts = []
      if (overlapIndex > -1) {
        updatedPosts = state.posts.slice(0, overlapIndex)
          .concat(payload)
      } else {
        updatedPosts = state.posts.concat(payload)
      }
      return { ...state, posts: updatedPosts, loading: false }

    case LIKES_UPDATED: {
      let result = [...state.posts]
      let index = result.findIndex(post => post.id === payload.postId)
      if (index !== -1) {
        result[index] = payload.post
      }
      return { ...state, posts: result, loading: false }
    }

    case POST_DELETED: {
      let result = [...state.posts].filter(post => post.id !== payload.postId)
      return { ...state, posts: result, loading: false }
    }

    case COMMENT_ADDED: {
      let result = [...state.posts].map((post) => {
        if (post.id === payload.postId) {
          return payload.post
        }
        return post
      })

      return { ...state, posts: result, loading: false }
    }

    case COMMENT_REMOVED: {
      let result = [...state.posts].map((post) => {
        if (post.id === payload.postId) {
          return payload.post
        }
        return post
      })

      return { ...state, posts: result, loading: false }
    }

    default:
      return {...state}
  }
}
