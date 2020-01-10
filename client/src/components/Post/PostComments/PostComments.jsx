import React, { Fragment } from 'react'
import useStyles from './postCommentsStyles'

const PostComments = ( props )  => {
  const classes = useStyles()

  const commentList = props.comments.map(item =>
    <div className={classes.comment}>
      <p className={classes.comment_text}><span className={classes.comment_author}>{item.author.firstName} {item.author.lastName}</span>{item.message}</p>
      <p className={classes.comment_date}>{item.date}</p>
    </div>
  )

  return (
    <Fragment className={classes.root}>
      <div className={classes.comments}>
        {commentList}
      </div>
    </Fragment>
  )
}

export default PostComments