import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Grid, Paper } from '@material-ui/core'
import ProfileCover from '../../components/ProfileCover/ProfileCover'
import ShortUserData from '../../components/ShortUserData/ShortUserData'
import ProfileField from '../../components/ProfileField/ProfileField'
import FriendsList from '../../components/FriendsList/FriendsList'
import MessagesList from '../../components/MessagesList/MessagesList'
import PhotosList from '../../components/PhotosList/PhotosList'
import CreatePost from '../../components/CreatePost/CreatePost'
import PostFeed from '../../components/PostFeed/PostFeed'
import InfiniteScroll from '../../components/InfiniteScroll/InfiniteScroll'

import { getUserPhotosFromPosts } from '../../actions/image'
import { getPostsForOwnProfile } from '../../actions/post'
import { loadUserFriends } from '../../actions/friends'

import useStyles from './profilePageStyles'

const FRIENDS_PAGE_SIZE = 20

const ProfilePage = ({
                       loadPostsProfile,
                       posts,
                       postsAreLoading,
                       user,
                       username,
                       loadUserPhotos,
                       userPhotos,
                       loadingPhotos,
                       friends,
                       friendsAreLoading,
                       loadUserFriends
                     }) => {
  const classes = useStyles()
  const [profileTab, setProfileTab] = useState('your story')
  const { incomingFriendRequests } = user

  useEffect(() => {
    loadUserPhotos()
    loadUserFriends(username, 0, FRIENDS_PAGE_SIZE, true)
  }, [loadUserPhotos, loadUserFriends, username])

  const handleChangeTab = (event, newValue) => {
    setProfileTab(newValue)
  }

  return (
    <InfiniteScroll
      contentArr={posts}
      loadContent={loadPostsProfile}
      contentIsLoading={postsAreLoading}
    >
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
              <ProfileField userPhotos={userPhotos} loadingPhotos={loadingPhotos} />
            </Paper>
            <Paper className={classes.paper}>
              <ProfileField friends={friends} />
            </Paper>
          </Grid>
          <Grid item xs={9} sm={5} className={classes.feedColumn}>
            <CreatePost />
            <PostFeed />
          </Grid>
        </Fragment>
        }
        { profileTab === 'friend requests' &&
        <Grid item sm={9}>
          <Paper className={classes.paper}>
            <FriendsList requests={incomingFriendRequests} />
          </Paper>
        </Grid>
        }
        { profileTab === 'friends' &&
        <Grid item sm={9}>
          <Paper className={classes.paper}>
            <FriendsList friends={friends} />
          </Paper>
        </Grid>
        }
        { profileTab === 'photos' &&
        <Grid item sm={9}>
          <Paper className={classes.paper}>
            <PhotosList userPhotos={userPhotos} />
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
    </InfiniteScroll>
  )
}

ProfilePage.propTypes = {
  user: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  loadUserPhotos: PropTypes.func.isRequired,
  userPhotos: PropTypes.array.isRequired,
  loadingPhotos: PropTypes.bool.isRequired,
  postsAreLoading: PropTypes.bool.isRequired,
  posts: PropTypes.array.isRequired,
  loadPostsProfile: PropTypes.func.isRequired,
  friends: PropTypes.array.isRequired,
  friendsAreLoading: PropTypes.bool.isRequired,
  loadUserFriends: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  user: state.auth.user,
  username: state.auth.user.username,
  userPhotos: state.images.userPhotos,
  loadingPhotos: state.images.loading,
  postsAreLoading: state.posts.loading,
  posts: state.posts.posts,
  friends: state.friends.userFriends,
  friendsAreLoading: state.friends.loading
})

const mapDispatchToProps = dispatch => ({
  loadUserPhotos: () => dispatch(getUserPhotosFromPosts()),
  loadPostsProfile: (page, size, isInitial) => dispatch(getPostsForOwnProfile(page, size, isInitial)),
  loadUserFriends: (username, page, size, isInitial) => dispatch(loadUserFriends(username, page, size, isInitial))
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
