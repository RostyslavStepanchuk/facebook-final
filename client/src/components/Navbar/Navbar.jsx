import React, { Fragment, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth'
import useStyles from './navbarStyles'
import { AppBar, Badge, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MailIcon from '@material-ui/icons/Mail'
import NotificationsIcon from '@material-ui/icons/Notifications'
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import MoreIcon from '@material-ui/icons/MoreVert'
import HomeIcon from '@material-ui/icons/Home'
import Search from '../Search/Search'
import { selectFriendRequestTab } from '../../actions/profileTab'
import { get } from 'lodash'

const Navbar = ({ auth: { isAuthenticated, user }, incomingFriendRequests, selectFriendRequestTab, logout }) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null)

  let history = useHistory()

  const handleChange = () => {
    if (!isAuthenticated) {
      history.push('/login')
    } else {
      logout()
      history.push('/')
    }
  }

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const openProfile = () => {
    handleMenuClose()
    history.push('/me')
  }

  const openFriendRequestInProfile = () => {
    handleMenuClose()
    selectFriendRequestTab()
    history.push('/me')
  }

  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={openProfile}>Profile</MenuItem>
      <MenuItem onClick={handleChange}>Logout</MenuItem>
    </Menu>
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label='show 4 new mails' color='inherit'>
          <Badge badgeContent={4} color='secondary'>
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label='show 11 new notifications' color='inherit'>
          <Badge badgeContent={11} color='secondary'>
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'
        >
          <AccountCircle />
        </IconButton>
        <p>Menu</p>
      </MenuItem>
    </Menu>
  )

  return (
    <div className={classes.root} >
      <AppBar position='static' className={classes.container} >
        <Toolbar>
          <Link to='/' className={classes.link}>
            <IconButton
              className={classes.navbarButton}
              edge='start'
              color='inherit'
              aria-label='menu'>
              <HomeIcon />
            </IconButton>
          </Link>
          <Typography variant='h6' className={classes.title}>
            <Link to='/' className={classes.link}>
              DANBook
            </Link>
          </Typography>
          <div className={classes.searchContainer}>
            <Search />
          </div>

          {isAuthenticated && (
          <Fragment>
            <div className={classes.root} />
            <div className={classes.sectionDesktop}>
              <Tooltip title='Messages'>
                <IconButton
                  className={classes.navbarButton}
                  color='inherit'>
                  <Badge badgeContent={4} color='secondary'>
                    <MailIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Tooltip title='Friend requests'>
                <IconButton
                  className={classes.navbarButton}
                  onClick={openFriendRequestInProfile}
                  color='inherit'>
                  <Badge badgeContent={get(incomingFriendRequests, 'length', '0')} color='secondary'>
                    <SupervisedUserCircleIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              <IconButton
                className={classes.navbarButton}
                edge='end'
                aria-label='account of current user'
                aria-controls={menuId}
                aria-haspopup='true'
                onClick={handleProfileMenuOpen}
                color='inherit'
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label='show more'
                aria-controls={mobileMenuId}
                aria-haspopup='true'
                onClick={handleMobileMenuOpen}
                color='inherit'
            >
                <MoreIcon />
              </IconButton>
            </div>
          </Fragment>
          )}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  selectFriendRequestTab: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  incomingFriendRequests: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  incomingFriendRequests: state.friends.incomingFriendRequests
})

const mapDispatchToProps = dispatch => ({
  selectFriendRequestTab: () => dispatch(selectFriendRequestTab()),
  logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
