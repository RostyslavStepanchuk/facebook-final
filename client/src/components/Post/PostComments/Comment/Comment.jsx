import React, { Fragment } from 'react'
import useStyles from './commentStyles'
import PropTypes from 'prop-types'

import getDate from '../../../../utils/date/getDate'

const Comment = ( { comment } )  => {
  const classes = useStyles()

  return (
    <Fragment>
      <div className={classes.comment}>
        <p className={classes.comment_text}><span className={classes.comment_author}>{comment.author.firstName} {comment.author.lastName}</span>{comment.message}</p>
        <p className={classes.comment_date}>{getDate(comment.date)}</p>
      </div>
    </Fragment>
  )
}

Comment.propTypes = {
  comment: PropTypes.object,
}

export default Comment