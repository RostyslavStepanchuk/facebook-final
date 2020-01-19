import { combineReducers } from 'redux'
import { reducer as toastrReducer } from 'react-redux-toastr'
import auth from './auth'
import posts from './posts'
import images from './images'

export default combineReducers({
  auth,
  posts,
  images,
  toastr: toastrReducer

})
