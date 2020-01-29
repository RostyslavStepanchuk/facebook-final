import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { Container, Grid } from '@material-ui/core'
import useStyles from './homePageStyles'

import CreatePost from '../../components/CreatePost/CreatePost'
import PostFeed from '../../components/PostFeed/PostFeed'
import { getPostsForHomePage } from '../../actions/post'
import { loadActiveFriends } from '../../actions/friends'
import PropTypes from 'prop-types'
import InfiniteScroll from '../../components/InfiniteScroll/InfiniteScroll'
import ActiveFriends from '../../components/ActiveFriends/ActiveFriends'

const POSTS_PAGE_SIZE = 10
const FIRST_PAGE = 0
const ACTIVE_FRIENDS_PAGE_SIZE = 10

const HomePage = ({
  loadPostsHomePage,
  postsAreLoading,
  posts,
  activeFriends,
  activeFriendsAreLoading,
  loadActiveFriends
}) => {
  const classes = useStyles()
  useEffect(() => {
    loadPostsHomePage(FIRST_PAGE, POSTS_PAGE_SIZE, true)
    loadActiveFriends(FIRST_PAGE, ACTIVE_FRIENDS_PAGE_SIZE)
  }, [ loadPostsHomePage, loadActiveFriends ])

  return (
    <InfiniteScroll
      contentArr={posts}
      loadContentHandler={loadPostsHomePage}
      contentIsLoading={postsAreLoading}
      size={POSTS_PAGE_SIZE}
    >
      <Container className={classes.container} maxWidth='lg'>
        <Grid container spacing={2}>
          <Grid item md={2}>
            <div className={classes.leftSectionPlaceholder}>Menu section</div>
          </Grid>
          <Grid item md={6}>
            <CreatePost />
            <PostFeed />
          </Grid>
          <Grid item md={4}>
            <ActiveFriends
              activeFriends={activeFriends}
              activeFriendsAreLoading={activeFriendsAreLoading} />
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
  activeFriends: PropTypes.array.isRequired,
  activeFriendsAreLoading: PropTypes.bool.isRequired,
  loadActiveFriends: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  postsAreLoading: state.posts.loading,
  posts: state.posts.posts,
  activeFriends: state.friends.activeFriends,
  activeFriendsAreLoading: state.friends.loadingActiveFriends
})

const mapDispatchToProps = dispatch => {
  return {
    loadPostsHomePage: (page, size, isInitial) => dispatch(getPostsForHomePage(page, size, isInitial)),
    loadActiveFriends: (page, size) => dispatch(loadActiveFriends(page, size))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
