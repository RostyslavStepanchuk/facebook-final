import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import HomePage from '../../pages/HomePage/HomePage'
import ProfilePage from '../../pages/ProfilePage/ProfilePage'
import { Redirect, Route, Switch } from 'react-router-dom'
import { loadUser } from '../../actions/auth'
import Preloader from '../Preloader/Preloader'

const ProtectedRouter = ({ isAuthenticated, isUserLoading, emailIsConfirmed, user, loadUser }) => {
  useEffect(()=> loadUser(), [ loadUser ])
  if ( !isAuthenticated && !isUserLoading) {
    return <Redirect to='/login'/>
  } else if ( user === null ) {
    return <Preloader/>
  } else if ( !emailIsConfirmed ) {
    return <Redirect to='/access_denied' />
  } else {
    return (
      <Switch>
        <Route exact path='/profile' component={ProfilePage} />
        <Route exact path='/' component={HomePage} />
      </Switch>
    )
  }

}

ProtectedRouter.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isUserLoading: PropTypes.bool.isRequired,
  user: PropTypes.object,
  emailIsConfirmed: PropTypes.bool.isRequired,
  loadUser: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isUserLoading: state.auth.loading,
  user: state.auth.user,
  emailIsConfirmed: state.auth.emailIsConfirmed
})

const mapDispatchToProps = dispatch => {
  return {
    loadUser: ()=>dispatch(loadUser()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRouter)