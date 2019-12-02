import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth'
import useStyles from './navbarStyles'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Switch,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Menu
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  let history = useHistory()

  const handleChange = () => {
    if (!isAuthenticated) {
      history.push('/login')
    } else {
      logout()
      history.push('/')
    }
  }

  const handleMenu = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className={classes.root}>
      <FormGroup>
        {!loading && (
          <FormControlLabel
            control={<Switch checked={isAuthenticated} onChange={handleChange} aria-label='LoginSwitch' />}
            label={isAuthenticated ? 'Logout' : 'Login'}
          />
        )}
      </FormGroup>
      <AppBar position='static'>
        <Toolbar>
          <IconButton edge='start' className={classes.menuButton} color='inherit' aria-label='menu'>
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            DANBook
          </Typography>
          {isAuthenticated && (
            <div>
              <IconButton
                aria-label='Account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleMenu}
                color='inherit'>
                <AccountCircle />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={open}
                onClose={handleClose}>
                <MenuItem onClick={handleClose} key={1}>
                  Profile
                </MenuItem>
                <MenuItem onClick={handleClose} key={2}>
                  My account
                </MenuItem>
                <MenuItem onClick={handleClose} key={3}>
                  My feed
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar)
