import React from 'react'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import useStyles from './postStyles'

import PostAuthor from './PostAuthor/PostAuthor'
import PostComments from './PostComments/PostComments'

const Post = ({ post }) => {
  const classes = useStyles()

  return (
    <Paper key={post.id} className={classes.posts_item}>
      <PostAuthor author={post.author} />
      <img src={post.image} className={classes.post_img} alt='Post' />
      <PostComments comments={post.comments} />
    </Paper>
  )
}

Post.propTypes = {
  post: PropTypes.object.isRequired
}

export default Post