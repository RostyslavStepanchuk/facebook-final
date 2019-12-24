import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

import ResetPassword from './components/auth/ResetPassword/ResetPassword'
import EmailNeedsConfirmationPage from './pages/EmailNeedsConfirmation/EmailNeedsConfirmationPage'
import Navbar from './components/layout/Navbar/Navbar'
import Landing from './components/layout/Landing/Landing'
import Register from './components/auth/Register/Register'
import Login from './components/auth/Login/Login'
import Toastr from './components/toastr/Toastr'
import EmailConfirmedPage from './pages/EmailConfirmed/EmailConfirmedPage'
import HomePage from './pages/HomePage/HomePage'

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
          <Route exact path='/access_denied' component={EmailNeedsConfirmationPage} />
          <Route exact path='/email/confirm/:token' component={EmailConfirmedPage} />
          <Route exact path='/home' component={HomePage} />
          <Route exact path='/' component={Landing} />
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
