import React, { Fragment, useState } from 'react'
import ProfileCover from '../../components/ProfileCover/ProfileCover'
import ShortUserData from '../../components/ShortUserData/ShortUserData'
import ProfileField from '../../components/ProfileField/ProfileField'
import FriendRequestsList from '../../components/FriendRequestsList/FriendRequestsList'
import FriendsList from '../../components/FriendsList/FriendsList'
import MessagesList from '../../components/MessagesList/MessagesList'
import CreatePost from '../../components/CreatePost/CreatePost'
import PostFeed from '../../components/PostFeed/PostFeed'

import { Grid, Paper } from '@material-ui/core'
import useStyles from './profilePageStyles'

const ProfilePage = () => {
  const classes = useStyles()

  const [profileTab, setProfileTab] = useState('your story')

  const handleChangeTab = (event, newValue) => {
    setProfileTab(newValue)
  }

  return (
    <div className={classes.background}>
      <Grid container className={classes.gridContainer}>
        <Grid item xs={9}>
          <Paper className={classes.paper}>
            <ProfileCover profileTab={profileTab} handleChangeTab={handleChangeTab} />
          </Paper>
        </Grid>
        { profileTab === 'your story' &&
          <Fragment>
            <Grid item xs={9} sm={4}>
              <Paper className={classes.paper}>
                <ShortUserData />
              </Paper>
              <Paper className={classes.paper}>
                <ProfileField fieldName='Photos' />
              </Paper>
              <Paper className={classes.paper}>
                <ProfileField fieldName='Friends' />
              </Paper>
            </Grid>
            <Grid item xs={9} sm={5}>
              <Paper className={classes.paper}>
                <CreatePost />
              </Paper>
              <Paper className={classes.paper}>
                <PostFeed origin='profile' />
              </Paper>
            </Grid>
          </Fragment>
        }
        { profileTab === 'friend requests' &&
          <Grid item sm={9}>
            <Paper className={classes.paper}>
              <FriendRequestsList />
            </Paper>
          </Grid>
        }
        { profileTab === 'friends' &&
          <Grid item sm={9}>
            <Paper className={classes.paper}>
              <FriendsList />
            </Paper>
          </Grid>
        }
        { profileTab === 'messages' &&
          <Grid item sm={9}>
            <Paper className={classes.paper}>
              <MessagesList />
            </Paper>
          </Grid>
        }
      </Grid>
    </div>
  )
}

export default ProfilePage
