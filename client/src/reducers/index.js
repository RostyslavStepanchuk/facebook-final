import { combineReducers } from 'redux'
import { reducer as toastrReducer } from 'react-redux-toastr'
import auth from './auth'
import posts from './posts'
import search from './search'

export default combineReducers({
  auth,
  posts,
  search,
  toastr: toastrReducer

})
