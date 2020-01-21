import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Post from '../Post/Post'
import Preloader from '../Preloader/Preloader'
import { Typography } from '@material-ui/core'

const PostFeed = ({ loading, posts }) => {
  const content = posts.length > 0
    ? posts.map(post => <Post post={post} key={post.id} />)
    : <Typography>Your posts and posts of your friends will be displayed here</Typography>

  return (
    <div>
      {content}
      {loading ? <Preloader /> : null}
    </div>
  )
}

PostFeed.propTypes = {
  loading: PropTypes.bool.isRequired,
  posts: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  posts: state.posts.posts,
  loading: state.posts.loading
})

export default connect(mapStateToProps, null)(PostFeed)
