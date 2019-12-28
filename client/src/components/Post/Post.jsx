import React from 'react'
import PropTypes from 'prop-types'

import Paper from '@material-ui/core/Paper'

const Post = ({ post }) => {
  return (
    <Paper>
      This will be a post some day

      <p>Author: {post.author.username}</p>
      <p>Message: {post.message}</p>
    </Paper>
  )
}

Post.propTypes = {
  post: PropTypes.object.isRequired
}

export default Post