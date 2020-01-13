import React, { Fragment } from 'react'
import useStyles from './postCommentsStyles'
import PropTypes from 'prop-types'

import Comment from './Comment/Comment'

const PostComments = ({ comments }) => {
  const classes = useStyles()

  const commentList = comments.map(comment => <Comment comment={comment} key={comment.id} />)

  return (
    <Fragment>
      <div className={classes.comments}>
        {commentList}
      </div>
    </Fragment>
  )
}

PostComments.propTypes = {
  comments: PropTypes.array
}

export default PostComments
