import React from 'react'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import useStyles from './postStyles'

import PostAuthor from './PostAuthor/PostAuthor'
import PostLikePanel from './PostLikePanel/PostLikePanel'
import PostComments from './PostComments/PostComments'
import CreateComment from './CreateComment/CreateComent'

const Post = ({ post: { id, author, owner, date, message, image, comments, likes } }) => {
  const classes = useStyles()

  return (
    <Paper key={id} className={classes.post}>
      <PostAuthor author={author} owner={owner} date={date}/>
      <img src={image} className={classes.postImg} alt='Post' />
      <p>{message}</p>
      <PostLikePanel id={id} likes={likes} comments={comments} />
      <PostComments comments={comments} />
      <CreateComment id={id}/>
    </Paper>
  )
}

Post.propTypes = {
  post: PropTypes.object.isRequired
}

export default Post