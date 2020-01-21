import React, { Fragment } from 'react'
import { Grid, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import useStyles from './friendsListStyles'
import FriendsListItem from './FriendsListItem/FriendsListItem'

const FriendsList = ({ friends, requests }) => {
  const classes = useStyles()

  const fieldComponents = components => {
    if (friends) {
      return components.map(friend => <FriendsListItem friend={friend} key={friend.avatar.id} />)
    } else {
      return components.map(request => <FriendsListItem request={request} key={request.id} />)
    }
  }

  const content = (friends) ? fieldComponents(friends) : fieldComponents(requests)

  return (
    <div className={classes.container}>
      <Typography className={classes.header} variant='subtitle1' component='div'>
        { friends
          ? <Fragment>Friends <span className={classes.count}>{friends.length}</span></Fragment>
          : <Fragment>Friend requests <span className={classes.count}>{requests.length}</span></Fragment>
        }
      </Typography>
      <Grid className={classes.gridContainer} container>
        {content}
      </Grid>
    </div>
  )
}

FriendsList.propTypes = {
  friends: PropTypes.array,
  requests: PropTypes.array
}

export default FriendsList
