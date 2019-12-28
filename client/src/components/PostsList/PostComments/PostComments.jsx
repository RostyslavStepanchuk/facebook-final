import React, { Fragment } from 'react'
import useStyles from './postCommentsStyles'

const PostComments = ({ comments })  => {
  const classes = useStyles()

  const commentArray = comments.map(item =>
    <div className={classes.comment}>
      <p className={classes.comment_text}><span className={classes.comment_author}>{item.author.firstName} {item.author.lastName}</span>{item.message}</p>
      <p className={classes.comment_date}>{item.date}</p>
    </div>
  )

  return (
    <Fragment className={classes.comments}>
      {commentArray}
    </Fragment>
  )

}

export default PostComments