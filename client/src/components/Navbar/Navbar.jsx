import React, { Fragment, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth'
import useStyles from './navbarStyles'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Badge
} from '@material-ui/core'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MailIcon from '@material-ui/icons/Mail'
import NotificationsIcon from '@material-ui/icons/Notifications'
import MoreIcon from '@material-ui/icons/MoreVert'
import MenuIcon from '@material-ui/icons/Menu'

import Search from '../Search/Search'

const Navbar = ({ auth: { isAuthenticated, user }, logout }) => {
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
    history.push(`/profile/${user.username}`)
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
      <MenuItem onClick={handleMenuClose}>Find Friends</MenuItem>
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
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Link to='/' className={classes.link}>
            <IconButton edge='start' className={classes.menuButton} color='inherit' aria-label='menu'>
              <MenuIcon />
            </IconButton>
          </Link>
          <Typography variant='h6' className={classes.title}>
            DANBook
          </Typography>
          <div className={classes.searchContainer}>
            <Search />
          </div>

          {isAuthenticated && (
          <Fragment>
            <div className={classes.root} />
            <div className={classes.sectionDesktop}>
              <IconButton aria-label='show 4 new mails' color='inherit'>
                <Badge badgeContent={4} color='secondary'>
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton aria-label='show 17 new notifications' color='inherit'>
                <Badge badgeContent={17} color='secondary'>
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
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
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar)
