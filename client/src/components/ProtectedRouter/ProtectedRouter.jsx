import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import HomePage from '../../pages/HomePage/HomePage'
import ProfilePage from '../../pages/ProfilePage/ProfilePage'
import { Redirect, Route, Switch } from 'react-router-dom'
import { loadUser } from '../../actions/auth'
import Preloader from '../Preloader/Preloader'
import ChatList from '../Chat/Message/ChatList'

const ProtectedRouter = ({ authFailed, emailIsConfirmed, user, loadUser }) => {
  useEffect(() => loadUser(), [ loadUser ])
  if (authFailed) {
    return <Redirect to='/login' />
  } else if (user === null) {
    return <Preloader />
  } else if (!emailIsConfirmed) {
    return <Redirect to='/access_denied' />
  } else {
    return (
      <Switch>
        <Route exact path='/profile/:userId' component={ProfilePage} />
        <Route exact path='/me' component={ProfilePage} />
        <Route exact path='/chat/:chatId' component={ChatList} />
        <Route exact path='/' component={HomePage} />
      </Switch>
    )
  }
}

ProtectedRouter.propTypes = {
  authFailed: PropTypes.bool.isRequired,
  user: PropTypes.object,
  emailIsConfirmed: PropTypes.bool.isRequired,
  loadUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  authFailed: state.auth.authFailed,
  user: state.auth.user,
  emailIsConfirmed: state.auth.emailIsConfirmed
})

const mapDispatchToProps = dispatch => {
  return {
    loadUser: () => dispatch(loadUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRouter)
