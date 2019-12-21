import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

import ResetPassword from './components/auth/ResetPassword'
import EmailNeedsConfirmation from "./pages/EmailNeedsConfirmation";
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Toastr from './components/toastr/Toastr'
import EmailConfirmed from './pages/EmailConfirmed'



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
          <Route exact path='/access/denied' component={EmailNeedsConfirmation} />
          <Route exact path='/email/confirm/:token' component={EmailConfirmed} />
          <Route exact path='/' component={Landing} />
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
