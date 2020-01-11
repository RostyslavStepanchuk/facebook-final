import React, { Fragment } from 'react'
import useStyles from './commentStyles'
import PropTypes from 'prop-types'

import getDate from '../../../../utils/date/getDate'

const Comment = ( { comment: { author, message, date } } )  => {
  const classes = useStyles()

  return (
    <Fragment>
      <div className={classes.comment}>
        <p className={classes.commentText}><span className={classes.commentAuthor}>{author.firstName} {author.lastName}</span>{message}</p>
        <p className={classes.commentDate}>{getDate(date)}</p>
      </div>
    </Fragment>
  )
}

Comment.propTypes = {
  comment: PropTypes.object,
}

export default Comment