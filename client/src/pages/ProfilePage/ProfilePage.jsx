import React from 'react'
import { connect } from 'react-redux'

import ProfileCover from '../../components/ProfileCover/ProfileCover'
import ShortUserData from '../../components/ShortUserData/ShortUserData'
import UserPhotos from '../../components/UserPhotos/UserPhotos'
import UserFriends from '../../components/UserFriends/UserFriends'
import CreatePost from '../../components/CreatePost/CreatePost'
import PostFeed from '../../components/PostFeed/PostFeed'

import { Grid, Paper } from '@material-ui/core'
import useStyles from './profilePageStyles'
import PropTypes from 'prop-types'
import { getPostsForOwnProfile } from '../../actions/post'
import InfiniteScroll from '../../components/InfiniteScroll/InfiniteScroll'

const ProfilePage = ({ loadPostsProfile, posts, postsAreLoading }) => {
  const classes = useStyles()

  return (
    <InfiniteScroll
      contentArr={posts}
      loadContent={loadPostsProfile}
      contentIsLoading={postsAreLoading}
    >
      <Grid container className={classes.gridContainer}>
        <Grid item xs={10}>
          <Paper className={classes.paper}>
            <ProfileCover />
          </Paper>
        </Grid>
        <Grid item xs={10} sm={4}>
          <Paper className={classes.paper}>
            <ShortUserData />
          </Paper>
          <Paper className={classes.paper}>
            <UserPhotos />
          </Paper>
          <Paper className={classes.paper}>
            <UserFriends />
          </Paper>
        </Grid>
        <Grid item xs={10} sm={5}>
          <Paper className={classes.paper}>
            <CreatePost />
          </Paper>
          <PostFeed />
        </Grid>
      </Grid>
    </InfiniteScroll>
  )
}

ProfilePage.propTypes = {
  postsAreLoading: PropTypes.bool.isRequired,
  posts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  postsAreLoading: state.posts.loading,
  posts: state.posts.posts
})

const mapDispatchToProps = dispatch => {
  return {
    loadPostsProfile: (page, size, isInitial) => dispatch(getPostsForOwnProfile(page, size, isInitial))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage)
