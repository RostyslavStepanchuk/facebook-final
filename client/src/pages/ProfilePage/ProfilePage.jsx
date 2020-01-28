import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
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
import Preloader from '../../components/Preloader/Preloader'
import { getUserPhotosFromPosts } from '../../actions/image'
import { getPostsForProfile } from '../../actions/post'
import { getUserProfile } from '../../actions/search'
import { getIncomingFriendRequests, loadUserFriends } from '../../actions/friends'

import useStyles from './profilePageStyles'

const FRIENDS_PAGE_SIZE = 20
const POSTS_PAGE_SIZE = 10
const FIRST_PAGE = 0

const ProfilePage = ({
     loadUserProfile,
     posts,
     postsAreLoading,
     user,
     loadUserPhotos,
     userPhotos,
     loadingPhotos,
     profileOwner,
     profileLoading,
     getPostsForProfile,
     friends,
     friendsAreLoading,
     loadUserFriends,
     incomingFriendRequests,
     getIncomingFriendRequests
   }) => {
  const classes = useStyles()
  const userId = useParams().userId || user.username
  const isOwnProfile = userId === user.username
  const [profileTab, setProfileTab] = useState('your story')

  const loadUserPosts = getPostsForProfile.bind(null, userId)

  useEffect(() => {
    loadUserProfile(userId)
    loadUserPhotos(userId)
    getPostsForProfile(userId, FIRST_PAGE, POSTS_PAGE_SIZE, true)
    loadUserFriends(userId, FIRST_PAGE, FRIENDS_PAGE_SIZE, true)
  }, [ loadUserPhotos, loadUserProfile, loadUserFriends, getPostsForProfile, userId ])
  useEffect(() => { // separate useEffect cause this request doesn't depend on profile change, it's for user
    if (isOwnProfile) {
      getIncomingFriendRequests()
    }
  }, [getIncomingFriendRequests, isOwnProfile])

  const handleChangeTab = (event, newValue) => {
    setProfileTab(newValue)
  }

  return profileLoading ? <Preloader /> : (
    <InfiniteScroll
      contentArr={posts}
      loadContentHandler={loadUserPosts}
      contentIsLoading={postsAreLoading}
    >
      <Grid container className={classes.gridContainer}>
        <Grid item xs={9}>
          <Paper className={classes.paper}>
            <ProfileCover
              profileOwner={profileOwner}
              isOwnProfile={isOwnProfile}
              profileTab={profileTab}
              handleChangeTab={handleChangeTab} />
          </Paper>
        </Grid>
        {profileTab === 'your story' &&
        <Fragment>
          <Grid item xs={9} sm={4}>
            <Paper className={classes.paper}>
              <ShortUserData profileOwner={profileOwner} />
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
        {profileTab === 'friend requests' &&
        <Grid item sm={9}>
          <Paper className={classes.paper}>
            <FriendsList requests={incomingFriendRequests} />
          </Paper>
        </Grid>
        }
        {profileTab === 'friends' &&
        <Grid item sm={9}>
          <Paper className={classes.paper}>
            <FriendsList friends={friends} />
          </Paper>
        </Grid>
        }
        {profileTab === 'photos' &&
        <Grid item sm={9}>
          <Paper className={classes.paper}>
            <PhotosList userPhotos={userPhotos} />
          </Paper>
        </Grid>
        }
        {profileTab === 'messages' &&
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
  loadUserPhotos: PropTypes.func.isRequired,
  userPhotos: PropTypes.array.isRequired,
  loadingPhotos: PropTypes.bool.isRequired,
  postsAreLoading: PropTypes.bool.isRequired,
  posts: PropTypes.array.isRequired,
  getPostsForProfile: PropTypes.func.isRequired,
  loadUserProfile: PropTypes.func.isRequired,
  profileOwner: PropTypes.object.isRequired,
  profileLoading: PropTypes.bool.isRequired,
  friends: PropTypes.array.isRequired,
  friendsAreLoading: PropTypes.bool.isRequired,
  loadUserFriends: PropTypes.func.isRequired,
  incomingFriendRequests: PropTypes.array.isRequired,
  getIncomingFriendRequests: PropTypes.func.isRequired

}

const mapStateToProps = state => ({
  user: state.auth.user,
  userPhotos: state.images.userPhotos,
  loadingPhotos: state.images.loading,
  postsAreLoading: state.posts.loading,
  posts: state.posts.posts,
  profileOwner: state.search.userProfile,
  profileLoading: state.search.profileLoading,
  friends: state.friends.userFriends,
  friendsAreLoading: state.friends.loading,
  incomingFriendRequests: state.friends.incomingFriendRequests
})

const mapDispatchToProps = dispatch => ({
  loadUserPhotos: (userId) => dispatch(getUserPhotosFromPosts(userId)),
  getPostsForProfile: (userId, page, size, isInitial) => dispatch(getPostsForProfile(userId, page, size, isInitial)),
  loadUserProfile: (userId) => dispatch(getUserProfile(userId)),
  loadUserFriends: (username, page, size, isInitial) => dispatch(loadUserFriends(username, page, size, isInitial)),
  getIncomingFriendRequests: () => dispatch(getIncomingFriendRequests())
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
