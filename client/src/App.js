import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

import ResetPassword from './pages/ResetPassword/ResetPassword'
import EmailNeedsConfirmationPage from './pages/EmailNeedsConfirmation/EmailNeedsConfirmationPage'
import Navbar from './components/Navbar/Navbar'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Toastr from './components/Toastr/Toastr'
import EmailConfirmedPage from './pages/EmailConfirmed/EmailConfirmedPage'
import ProtectedRouter from './components/ProtectedRouter/ProtectedRouter'
import Background from './components/Background/Background'

function App () {
  return (
    <Provider store={store}>
      <Toastr />
      <Router>
        <Navbar />
        <Background>
          <Switch>
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/email/confirm/:token' component={EmailConfirmedPage} />
            <Route exact path='/password_reset' component={ResetPassword} />
            <Route exact path='/access_denied' component={EmailNeedsConfirmationPage} />
            <Route path='/' component={ProtectedRouter} />
          </Switch>
        </Background>
      </Router>
    </Provider>
  )
}

export default App
