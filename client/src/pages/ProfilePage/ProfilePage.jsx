import React, { Fragment, useEffect } from 'react'
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
import { clearCurrentChatMessages } from '../../actions/chat'

import useStyles from './profilePageStyles'
import { resetTab } from '../../actions/profileTab'

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
     getIncomingFriendRequests,
     resetTab,
     selectedTab,
     clearCurrentChatMessages
   }) => {
  const classes = useStyles()
  const userId = useParams().userId || user.username
  const isOwnProfile = userId === user.username
  const currentUser = user.username
  const loadUserPosts = getPostsForProfile.bind(null, userId)

  useEffect(() => {
    loadUserProfile(userId)
    loadUserPhotos(userId)
    getPostsForProfile(userId, FIRST_PAGE, POSTS_PAGE_SIZE, true)
    loadUserFriends(userId, FIRST_PAGE, FRIENDS_PAGE_SIZE, true)
    if (currentUser !== userId) resetTab()
  }, [ loadUserPhotos, loadUserProfile, loadUserFriends, getPostsForProfile, userId, resetTab, currentUser ])

  useEffect(() => { // separate useEffect cause this request doesn't depend on profile change, it's for user
    getIncomingFriendRequests()
  }, [getIncomingFriendRequests, isOwnProfile])

  useEffect(() => {
    if (selectedTab !== 'messages') {
      clearCurrentChatMessages()
    }
  }, [ selectedTab, clearCurrentChatMessages ])

  return profileLoading ? <Preloader /> : (
    <InfiniteScroll
      isDisable={selectedTab === 'messages'}
      contentArrLength={posts.length}
      loadContentHandler={loadUserPosts}
      contentIsLoading={postsAreLoading}
      scrollContainerStyles={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        overflowX: 'hidden',
        overflowY: 'scroll'
      }}
    >
      <Grid container className={classes.gridContainer} spacing={3}>
        <Grid item xs={9}>
          <Paper className={classes.paper}>
            <ProfileCover
              profileOwner={profileOwner}
              isOwnProfile={isOwnProfile}
              selectedTab={selectedTab} />
          </Paper>
        </Grid>
        {selectedTab === 'timeline' &&
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
            <Paper className={classes.paper}>
              <CreatePost profileOwner={profileOwner} />
            </Paper>
            <PostFeed />
          </Grid>
        </Fragment>
        }
        {selectedTab === 'friend requests' &&
        <Grid item sm={9}>
          <Paper className={classes.paper}>
            <FriendsList requests={incomingFriendRequests} />
          </Paper>
        </Grid>
        }
        {selectedTab === 'friends' &&
        <Grid item sm={9}>
          <Paper className={classes.paper}>
            <FriendsList friends={friends} />
          </Paper>
        </Grid>
        }
        {selectedTab === 'photos' &&
        <Grid item sm={9}>
          <Paper className={classes.paper}>
            <PhotosList userPhotos={userPhotos} />
          </Paper>
        </Grid>
        }
        {selectedTab === 'messages' &&
        <Grid item sm={9}>
          <Paper className={classes.paper}>
            <MessagesList userId={userId} />
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
  getIncomingFriendRequests: PropTypes.func.isRequired,
  resetTab: PropTypes.func.isRequired,
  selectedTab: PropTypes.string.isRequired,
  clearCurrentChatMessages: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  user: state.auth.user,
  selectedTab: state.profileTab.selectedTab,
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
  getIncomingFriendRequests: () => dispatch(getIncomingFriendRequests()),
  clearCurrentChatMessages: () => dispatch(clearCurrentChatMessages()),
  resetTab: () => dispatch(resetTab())
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
