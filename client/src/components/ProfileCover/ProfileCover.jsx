import React, { Fragment } from 'react'

import { Avatar, Tab, Tabs } from '@material-ui/core'
import useStyles from './profileCoverStyles'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const ProfileCover = ({ user }) =>  {
  const classes = useStyles()

  const { avatar, firstName, lastName } = user
  const [value, setValue] = React.useState('profile')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Fragment>
      <div className={classes.avatarBg}>
        <Avatar className={classes.avatarImg} src={avatar}/>
        <p className={classes.avatarName}>{firstName} {lastName}</p>
      </div>
      <Tabs value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            aria-label="icon label tabs"
            className={classes.submenu}>
        <Tab className={classes.submenuItem} label="Profile" value="profile" /> {/*icon={<AccountCircleIcon />}*/}
        <Tab className={classes.submenuItem} label="About" value="about" /> {/*icon={<PersonIcon />}*/}
        <Tab className={classes.submenuItem} label="Friends" value="friends" /> {/*icon={<SupervisorAccountIcon />}*/}
        <Tab className={classes.submenuItem} label="Photos" value="photos" /> {/*icon={<PhotoCameraIcon />}*/}
        <Tab className={classes.submenuItem} label="Messages" value="messages" /> {/*icon={<EmailIcon />}*/}
      </Tabs>
    </Fragment>
  )
}

ProfileCover.propTypes = {
  user: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  user: state.auth.user,
})

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileCover)