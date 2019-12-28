import { combineReducers } from 'redux'
import { reducer as toastrReducer } from 'react-redux-toastr'
import auth from './auth'
import newsFeed from './newsFeed'

export default combineReducers({
  auth,
  newsFeed,
  toastr: toastrReducer

})
