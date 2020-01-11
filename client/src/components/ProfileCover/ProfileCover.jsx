import React, { Fragment } from 'react'

import { Avatar, Tab, Tabs } from '@material-ui/core'
import useStyles from './profileCoverStyles'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const ProfileCover = ({ user }) =>  {
  const classes = useStyles()

  const [value, setValue] = React.useState('profile')
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Fragment>
      <div className={classes.avatar_bg}>
        <Avatar className={classes.avatar_img} src={user.avatar}/>
        <p className={classes.avatar_name}>{user.firstName} {user.lastName}</p>
      </div>
      <Tabs value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            aria-label="icon label tabs"
            className={classes.submenu}>
        <Tab className={classes.submenu_item} label="Profile" value="profile" /> {/*icon={<AccountCircleIcon />}*/}
        <Tab className={classes.submenu_item} label="About" value="about" /> {/*icon={<PersonIcon />}*/}
        <Tab className={classes.submenu_item} label="Friends" value="friends" /> {/*icon={<SupervisorAccountIcon />}*/}
        <Tab className={classes.submenu_item} label="Photos" value="photos" /> {/*icon={<PhotoCameraIcon />}*/}
        <Tab className={classes.submenu_item} label="Messages" value="messages" /> {/*icon={<EmailIcon />}*/}
      </Tabs>
    </Fragment>
  )
}

ProfileCover.propTypes = {
  user: PropTypes.object,
}

const mapStateToProps = state => ({
  user: state.auth.user,
})

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCover)