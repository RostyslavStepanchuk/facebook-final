import { combineReducers } from 'redux'
import { reducer as toastrReducer } from 'react-redux-toastr'
import auth from './auth'

export default combineReducers({
  auth,
  toastr: toastrReducer

})
