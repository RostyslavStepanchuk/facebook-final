import React, { Fragment } from 'react'
import ProfileCover from '../../components/ProfileCover/ProfileCover'
import ShortUserData from '../../components/ShortUserData/ShortUserData'
import UserPhotos from '../../components/UserPhotos/UserPhotos'
import UserFriends from '../../components/UserFriends/UserFriends'
import CreatePost from '../../components/CreatePost/CreatePost'
import PostFeed from '../../components/PostFeed/PostFeed'

import { Grid, Paper } from '@material-ui/core'
import useStyles from './profilePageStyles'

const ProfilePage = () =>  {
  const classes = useStyles()

  return (
    <Fragment>
      <Grid container className={classes.gridContainer}>
        <Grid item xs={10}>
          <Paper className={classes.paper}>
            <ProfileCover/>
          </Paper>
        </Grid>
        <Grid item xs={10} sm={4}>
          <Paper className={classes.paper}>
            <ShortUserData/>
          </Paper>
          <Paper className={classes.paper}>
            <UserPhotos/>
          </Paper>
          <Paper className={classes.paper}>
            <UserFriends/>
          </Paper>
        </Grid>
        <Grid item xs={10} sm={5}>
          <Paper className={classes.paper}>
            <CreatePost/>
          </Paper>
          <Paper className={classes.paper}>
            <PostFeed origin='profile' />
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  )
}

export default ProfilePage