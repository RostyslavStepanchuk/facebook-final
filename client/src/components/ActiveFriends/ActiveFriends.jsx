import React from 'react'
import { Avatar, IconButton, Paper, Tooltip, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import useStyles from './activeFriendsStyles'
import Preloader from '../Preloader/Preloader'
import { getAvatarLink } from '../../utils/helpers/imageLinkHelpers'
import { getActiveTime } from '../../utils/date/getDate'
import MailOutlineIcon from '@material-ui/icons/MailOutline'

const ActiveFriends = ({ activeFriends, activeFriendsAreLoading }) => {
  const classes = useStyles()

  const friendsList = () => {
    if (activeFriends.length === 0) {
      return <p className={classes.notification}>You have no active friends.</p>
    } else {
      return activeFriends.map(friend => (
        <div className={classes.container} key={friend.lastActivityTime}>
          <div className={classes.user}>
            <Avatar className={classes.userPhoto} src={getAvatarLink(friend.avatar)} alt='User' />
            <div className={classes.userName}>
              <p className={classes.userFullName}>{friend.firstName} {friend.lastName} </p>
              <p className={classes.activeTime}>{getActiveTime(friend.lastActivityTime)}</p>
            </div>
          </div>
          <Tooltip title='Send message'>
            <IconButton color='primary' aria-label='Send message'>
              <MailOutlineIcon />
            </IconButton>
          </Tooltip>
        </div>
        )
      )
    }
  }

  const loadedContent = activeFriendsAreLoading ? <Preloader /> : friendsList()

  return (
    <Paper className={classes.paper}>
      <Typography className={classes.header} variant='subtitle1' component='div'>
        Active Friends <span className={classes.count}>{activeFriends.length}</span>
      </Typography>
      {loadedContent}
    </Paper>
  )
}

ActiveFriends.propTypes = {
  activeFriends: PropTypes.array.isRequired,
  activeFriendsAreLoading: PropTypes.bool.isRequired
}

export default ActiveFriends
