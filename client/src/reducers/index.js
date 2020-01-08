import { combineReducers } from 'redux'
import { reducer as toastrReducer } from 'react-redux-toastr'
import auth from './auth'
import posts from './posts'

export default combineReducers({
  auth,
  posts,
  toastr: toastrReducer

})
