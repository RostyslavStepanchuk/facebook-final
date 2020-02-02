import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Container, Grid } from '@material-ui/core'
import useStyles from './homePageStyles'
import CreatePost from '../../components/CreatePost/CreatePost'
import PostFeed from '../../components/PostFeed/PostFeed'
import InfiniteScroll from '../../components/InfiniteScroll/InfiniteScroll'
import ActiveFriends from '../../components/ActiveFriends/ActiveFriends'
import FriendSuggestions from '../../components/FriendSuggestions/FriendSuggestions'
import { getPostsForHomePage } from '../../actions/post'
import { getFriendSuggestions, loadActiveFriends } from '../../actions/friends'

const POSTS_PAGE_SIZE = 10
const FIRST_PAGE = 0
const FRIEND_SUGGESTIONS_SIZE = 5
const ACTIVE_FRIENDS_PAGE_SIZE = 10

const HomePage = ({
  loadPostsHomePage,
  postsAreLoading,
  posts,
  friendSuggestions,
  getFriendSuggestions,
  activeFriends,
  activeFriendsAreLoading,
  loadActiveFriends
}) => {
  const classes = useStyles()
  useEffect(() => {
    loadPostsHomePage(FIRST_PAGE, POSTS_PAGE_SIZE, true)
    getFriendSuggestions(FRIEND_SUGGESTIONS_SIZE)
    loadActiveFriends(FIRST_PAGE, ACTIVE_FRIENDS_PAGE_SIZE, true)
  }, [ loadPostsHomePage, getFriendSuggestions, loadActiveFriends ])

  return (
    <InfiniteScroll
      contentArr={posts}
      loadContentHandler={loadPostsHomePage}
      contentIsLoading={postsAreLoading}
      size={POSTS_PAGE_SIZE}
      scrollContainerStyles={{
        height: '80vh',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        overflowX: 'hidden',
        overflowY: 'scroll'
      }}
    >
      <Container className={classes.container} maxWidth='lg'>
        <Grid container spacing={2}>
          <Grid item md={3}>
            <FriendSuggestions suggestions={friendSuggestions} />
          </Grid>
          <Grid item md={6}>
            <CreatePost />
            <PostFeed />
          </Grid>
          <Grid item md={3}>
            <ActiveFriends
              activeFriends={activeFriends}
              activeFriendsAreLoading={activeFriendsAreLoading}
            />
          </Grid>
        </Grid>
      </Container>
    </InfiniteScroll>
  )
}

HomePage.propTypes = {
  postsAreLoading: PropTypes.bool.isRequired,
  posts: PropTypes.array.isRequired,
  loadPostsHomePage: PropTypes.func.isRequired,
  getFriendSuggestions: PropTypes.func.isRequired,
  friendSuggestions: PropTypes.array.isRequired,
  activeFriends: PropTypes.array.isRequired,
  activeFriendsAreLoading: PropTypes.bool.isRequired,
  loadActiveFriends: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  postsAreLoading: state.posts.loading,
  posts: state.posts.posts,
  friendSuggestions: state.friends.friendSuggestions,
  activeFriends: state.friends.activeFriends,
  activeFriendsAreLoading: state.friends.loadingActiveFriends
})

const mapDispatchToProps = dispatch => {
  return {
    loadPostsHomePage: (page, size, isInitial) => dispatch(getPostsForHomePage(page, size, isInitial)),
    getFriendSuggestions: page => dispatch(getFriendSuggestions(page)),
    loadActiveFriends: (page, size, isInitial) => dispatch(loadActiveFriends(page, size, isInitial))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
