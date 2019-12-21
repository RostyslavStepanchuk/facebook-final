import React, { Fragment } from 'react'

import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import PersonIcon from '@material-ui/icons/Person'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera'
import EmailIcon from '@material-ui/icons/Email'

import { Avatar, Typography, Paper, Grid, Button, Tab, Tabs} from '@material-ui/core'
import useStyles from './profileCoverStyles'

const ProfileCover = () =>  {
  const classes = useStyles()

  const [value, setValue] = React.useState('profile')
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Fragment className={classes.root}>
      <div className={classes.avatar_bg}>
        <Avatar className={classes.avatar_img}></Avatar>
        <p className={classes.avatar_name}>Name Surname</p>
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

export default ProfileCover