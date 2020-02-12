import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { Avatar, Grid, IconButton, Tooltip, Typography } from '@material-ui/core'
import PanToolOutlinedIcon from '@material-ui/icons/PanToolOutlined'
import CallMadeOutlinedIcon from '@material-ui/icons/CallMadeOutlined'

import useStyles from './friendSuggestionItemStyles'

import { sendFriendRequest } from '../../../actions/friends'
import { getAvatarLink } from '../../../utils/helpers/imageLinkHelpers'
import { get } from 'lodash'
import { getFullName } from '../../../utils/helpers/formatters'
import Box from '@material-ui/core/Box'

const COMMON_F_AVATARS_TO_SHOW = 4

const FriendSuggestions = ({ person, commonFriends }) => {
  const { username } = person

  const classes = useStyles()
  const [ requestSent, setRequestSent ] = useState(false)

  const createFriendRequest = responderId => {
    sendFriendRequest(responderId)
      .then(() => setRequestSent(true))
  }

  const commonFriendAvatars = commonFriends
    .map(cf => <Link to={'profile/' + cf.username} key={cf.username} >
      <Tooltip title={getFullName(cf)}>
        <Avatar src={getAvatarLink(cf)} alt={cf.username} className={classes.commonFriendAvatar} />
      </Tooltip>
    </Link>
    )
  commonFriendAvatars.length = COMMON_F_AVATARS_TO_SHOW

  return (
    <div elevation={0} className={classes.container}>
      <Grid container justify='space-between' alignContent='center'>
        <Grid item container xs={10}>
          <Grid item >
            <Link to={`/profile/${get(person, 'username')}`} >
              <Avatar className={classes.image} src={getAvatarLink(person)} alt='User' />
            </Link>
          </Grid>
          <Grid item >
            <Typography variant='subtitle1' component='div' className={classes.name}>
              <Link to={`/profile/${get(person, 'username')}`} className={classes.link}>
                {getFullName(person)}
              </Link>
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          { !requestSent ? (<Tooltip title='Send friend request'>
            <IconButton color='primary' onClick={() => createFriendRequest(username)} aria-label='Send friend request'>
              <PanToolOutlinedIcon />
            </IconButton>
          </Tooltip>) : (<CallMadeOutlinedIcon className={classes.requestSentIcon} />)
          }
        </Grid>
        <Grid item xs={12} >
          <Box display='flex'>
            <span>{commonFriends.length}</span> <span>common friend{commonFriends.length > 1 && 's'}: </span>
            {commonFriendAvatars} {commonFriendAvatars.length < commonFriends.length && '...'}
          </Box>
        </Grid>
      </Grid>
    </div>
  )
}

FriendSuggestions.propTypes = {
  person: PropTypes.shape({
    avatar: PropTypes.object,
    username: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired
  }).isRequired,
  commonFriends: PropTypes.array.isRequired
}

export default FriendSuggestions
