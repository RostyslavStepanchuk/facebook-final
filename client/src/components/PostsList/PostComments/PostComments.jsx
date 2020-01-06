import React, { Fragment } from 'react'
import useStyles from './postCommentsStyles'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { loadPosts } from '../../../actions/auth'

const PostComments = ( props )  => {
  const classes = useStyles()

  const commentArray = props.comments.map(item =>
    <div className={classes.comment}>
      <p className={classes.comment_text}><span className={classes.comment_author}>{item.author.firstName} {item.author.lastName}</span>{item.message}</p>
      <p className={classes.comment_date}>{item.date}</p>
    </div>
  )

  return (
    <Fragment className={classes.root}>
      <div className={classes.comments}>
        {commentArray}
      </div>
    </Fragment>
  )

}

export default PostComments