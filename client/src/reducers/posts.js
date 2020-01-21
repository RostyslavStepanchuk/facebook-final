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
  let overlapIndex;

  switch (type) {
    case POSTS_START_LOADING:
      return { ...state, loading: true }

    case POSTS_END_LOADING:
      return { ...state, loading: false }

    case RESET_RECEIVED_POSTS:
      return { ...state, posts: [] }

    case POSTS_RECEIVED:
      overlapIndex = state.posts.map(post => post.id)
        .indexOf(payload[0].id)

      if (overlapIndex > -1) {
        return { ...state,
          posts: state.posts.slice(0, overlapIndex)
            .concat(payload),
          loading: false }
      } else {
        return { ...state,
          posts: state.posts.concat(payload),
          loading: false }
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

    default:
      return {...state}
  }
}
