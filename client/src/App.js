import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Toastr from './components/toastr/Toastr'

import { Provider } from 'react-redux'
import store from './store'
import ResetPassword from './components/auth/ResetPassword'

function App() {
  return (
    <Provider store={store}>
      <Toastr />
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/password_reset' component={ResetPassword} />
          <Route exact path='/' component={Landing} />
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
