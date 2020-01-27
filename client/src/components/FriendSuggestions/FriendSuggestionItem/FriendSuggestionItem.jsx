import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { Grid, IconButton, Paper, Tooltip, Typography } from '@material-ui/core'
import PanToolOutlinedIcon from '@material-ui/icons/PanToolOutlined'
import CallMadeOutlinedIcon from '@material-ui/icons/CallMadeOutlined'

import useStyles from './friendSuggestionItemStyles'

import { sendFriendRequest } from '../../../actions/friends'
import { getAvatarLink } from '../../../utils/helpers/imageLinkHelpers'

const COMMON_F_AVATARS_TO_SHOW = 4

const FriendSuggestions = ({ person, commonFriends }) => {
  const classes = useStyles({ avatar: getAvatarLink(person.avatar) })
  const [ requestSent, setRequestSent ] = useState(false)

  const createFriendRequest = responderId => {
    sendFriendRequest(responderId)
      .then(() => setRequestSent(true))
  }

  const commonFriendAvatars = commonFriends
    .filter(cf => cf.avatar !== null)
    .map(cf => <Link to={'profile/' + cf.username} key={cf.username} >
      <img src={cf.avatar.src} alt={cf.username} className={classes.commonFriendAvatar} />
    </Link>
    )
  commonFriendAvatars.length = COMMON_F_AVATARS_TO_SHOW

  return (
    <Paper elevation={0} className={classes.paper}>
      <Grid container justify='space-between' alignContent='center'>
        <Grid item container xs={9}>
          <Grid item >
            <Link to={'profile/' + person.username} >
              <div className={classes.image} />
            </Link>
          </Grid>
          <Grid item >
            <Typography variant='subtitle1' component='div' className={classes.name}>
              {person.firstName} {person.lastName}
            </Typography>

          </Grid>
        </Grid>
        <Grid item xs={3}>
          { !requestSent ? (<Tooltip title='Send friend request' className={classes.sendRequestBtn}>
            <IconButton color='primary' onClick={() => createFriendRequest(person.username)} aria-label='Send friend request'>
              <PanToolOutlinedIcon />
            </IconButton>
          </Tooltip>) : (<CallMadeOutlinedIcon className={classes.requestSentIcon} />)
          }
        </Grid>
        <Grid item xs={12}>
          <Typography variant='body1' component='div'>
            <span>{commonFriends.length}</span> <span>common friend{commonFriends.length > 1 && 's'}: </span>
            {commonFriendAvatars} {commonFriendAvatars.length < commonFriends.length && '...'}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

FriendSuggestions.propTypes = {
  person: PropTypes.shape({
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired
  }).isRequired,
  commonFriends: PropTypes.array.isRequired
}

export default FriendSuggestions
