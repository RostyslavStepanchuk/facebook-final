import React, { Fragment } from 'react'
import { Grid, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import useStyles from './friendsListStyles'
import FriendsListItem from './FriendsListItem/FriendsListItem'
import Preloader from '../Preloader/Preloader'
import { get, isEmpty } from 'lodash'

const FriendsList = ({ friends, requests, friendsAreLoading }) => {
  const classes = useStyles()

  const fieldComponents = components => {
    if (friends) {
      if (isEmpty(friends)) {
        return <p className={classes.notification}>You have no friends</p>
      } else {
        return components.map(friend => <FriendsListItem friend={friend} key={get(friend, 'username')} />)
      }
    } else {
      if (isEmpty(requests)) {
        return <p className={classes.notification}>You have no friend requests</p>
      } else {
        return components.map(request => <FriendsListItem request={request} key={get(request.requester, 'username')} />)
      }
    }
  }

  const content = (friends) ? fieldComponents(friends) : fieldComponents(requests)
  const loadedContent = friendsAreLoading ? <Preloader /> : content

  return (
    <div className={classes.container}>
      <Typography className={classes.header} variant='subtitle1' component='div'>
        { friends
          ? <Fragment>Friends <span className={classes.count}>{get(friends, 'length', '—')}</span></Fragment>
          : <Fragment>Friend requests <span className={classes.count}>{get(requests, 'length', '—')}</span></Fragment>
        }
      </Typography>
      <Grid className={classes.gridContainer} container>
        {loadedContent}
      </Grid>
    </div>
  )
}

FriendsList.propTypes = {
  friends: PropTypes.array,
  requests: PropTypes.array,
  friendsAreLoading: PropTypes.bool
}

export default FriendsList
