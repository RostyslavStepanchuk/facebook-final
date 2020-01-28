import React, { Fragment } from 'react'
import { Avatar, Grid, Paper, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import useStyles from './activeFriendsStyles'
import Preloader from '../Preloader/Preloader'
import { getAvatarLink } from '../../utils/helpers/imageLinkHelpers'
import { getActiveTime } from '../../utils/date/getDate'

const ActiveFriends = ({ activeFriends, activeFriendsAreLoading }) => {
  const classes = useStyles()

  const friendsList = () => activeFriends.map( friend => (
      <div className={classes.user}>
        <Avatar className={classes.userPhoto} src={getAvatarLink(friend.avatar)} alt='User'/>
        <div className={classes.userName}>
          <p className={classes.userFullName}>{friend.firstName} {friend.lastName} </p>
          <p className={classes.activeTime}>{getActiveTime(friend.lastActiveTime)}</p>
        </div>
      </div>
    )
  )

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
  activeFriendsAreLoading: PropTypes.bool.isRequired,
}

export default ActiveFriends
