import { 
  POSTS_END_LOADING, 
  POSTS_RECEIVED, 
  POSTS_START_LOADING,
  ADD_COMMENT,
  UPDATE_LIKES,
  REMOVE_COMMENT,
  DELETE_POST
} from '../utils/constants/actionsName'

const initialState = {
  posts: [],
  loading: false
}

export default function (state=initialState, action) {
  const { type, payload } = action

  switch (type) {
    case POSTS_START_LOADING:
      return { ...state, loading: true }

    case POSTS_END_LOADING:
      return { ...state, loading: false }

    case POSTS_RECEIVED:
      return { ...state, posts: payload, loading: false }
      
    case UPDATE_LIKES: {
      let result = [...state.posts]
      result[payload.postId-1] = payload.post
      return { ...state, posts: result, loading: false }
    }

    case DELETE_POST: {
      // let result = [...state.posts]
      // result[payload.postId-1] = payload.post
      return { ...state, posts: [...state.posts], loading: false }
    }

    case ADD_COMMENT: {
      let result = [...state.posts]
      result[payload.postId-1] = payload.post
      return { ...state, posts: result, loading: false }
    }

    case REMOVE_COMMENT: {
      let result = [...state.posts]
      result[payload.postId-1] = payload.post
      return { ...state, posts: result, loading: false }
    }
    
    default:
      return {...state}

  }
}