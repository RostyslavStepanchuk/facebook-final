import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'

import { Provider } from 'react-redux'
import store from './store'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Landing} />
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
