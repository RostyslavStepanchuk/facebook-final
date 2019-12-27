import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import HomePage from '../../pages/HomePage/HomePage'
import { Redirect, Route } from 'react-router-dom'
import { Switch } from 'react-router-dom'
import { loadUser } from '../../actions/auth'
import Preloader from '../Preloader/Preloader'

const ProtectedRouter = ({ isAuthenticated, emailIsConfirmed, user, loadUser }) => {
  useEffect(()=> loadUser(), [ loadUser ])
  if ( !isAuthenticated ) {
    return <Redirect to='/login'/>
  } else if ( user === null ) {
    return <Preloader/>
  } else if ( !emailIsConfirmed ) {
    return <Redirect to='/access_denied' />
  } else {
    return (
      <Switch>
        <Route exact path='/' component={HomePage} />
      </Switch>
    )
  }

}

ProtectedRouter.propTypes = {
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
  emailIsConfirmed: PropTypes.bool,
  loadUser: PropTypes.func
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  emailIsConfirmed: state.auth.emailIsConfirmed
})

const mapDispatchToProps = dispatch => {
  return {
    loadUser: ()=>dispatch(loadUser()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRouter)