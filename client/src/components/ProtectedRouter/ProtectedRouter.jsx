import React, { useEffect } from 'react'

import HomePage from '../../pages/HomePage/HomePage'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Switch from '@material-ui/core/Switch'
import Landing from '../layout/Landing/Landing'
import { loadUser } from '../../actions/auth'

const ProtectedRouter = () => {
  useEffect(()=> loadUser(), [loadUser])

  return (
    <Switch>
      <Route exact path='/home' component={HomePage} />
      <Route path='/' component={Landing} />
    </Switch>
  )
}

export default ProtectedRouter