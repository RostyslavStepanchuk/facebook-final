import React, { Fragment } from 'react'
import useStyles from './postCommentsStyles'
import PropTypes from 'prop-types'

const PostComments = ( { comments } )  => {
  const classes = useStyles()

  const commentDate = (dateMilliseconds) => {
    let date = new Date(dateMilliseconds)

    let day = date.getDate()
    day = (day < 10) ? '0' + day : day

    let month = date.getMonth() + 1
    month = (month < 10) ? '0' + month : month

    let year = date.getFullYear() % 100
    year = (year < 10) ? '0' + year : year

    let minutes = parseInt((dateMilliseconds / (1000 * 60)) % 60)
    minutes = (minutes < 10) ? '0' + minutes : minutes

    let hours = parseInt((dateMilliseconds / (1000 * 60 * 60)) % 24)
    hours = (hours < 10) ? '0' + hours : hours

    return day + '.' + month + '.' + year + " at " + hours + ":" + minutes
  }

  const commentList = comments.map(comment =>
    <div className={classes.comment} key={comment.id}>
      <p className={classes.comment_text}><span className={classes.comment_author}>{comment.author.firstName} {comment.author.lastName}</span>{comment.message}</p>
      <p className={classes.comment_date}>{commentDate(comment.date)}</p>
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

PostComments.propTypes = {
  comments: PropTypes.array,
}

export default PostComments