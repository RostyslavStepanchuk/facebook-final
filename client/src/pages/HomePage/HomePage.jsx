import React from 'react'
import { connect } from 'react-redux'

import { Container, Grid } from '@material-ui/core'
import useStyles from './homePageStyles'

import CreatePost from '../../components/CreatePost/CreatePost'
import PostFeed from '../../components/PostFeed/PostFeed'
import { getPostsForHomePage } from '../../actions/post'
import PropTypes from 'prop-types'
import InfiniteScroll from '../../components/InfiniteScroll/InfiniteScroll'

const HomePage = ({ loadPostsHomePage, postsAreLoading, posts }) => {
  const classes = useStyles()

  return (
    <InfiniteScroll
      contentArr={posts}
      loadContent={loadPostsHomePage}
      contentIsLoading={postsAreLoading}
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
            <div className={classes.rightSectionPlaceholder} />
          </Grid>
        </Grid>
      </Container>
    </InfiniteScroll>
  )
}

HomePage.propTypes = {
  postsAreLoading: PropTypes.bool.isRequired,
  posts: PropTypes.array.isRequired,
  loadPostsHomePage: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  postsAreLoading: state.posts.loading,
  posts: state.posts.posts
})

const mapDispatchToProps = dispatch => {
  return {
    loadPostsHomePage: (page, size, isInitial) => dispatch(getPostsForHomePage(page, size, isInitial))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
