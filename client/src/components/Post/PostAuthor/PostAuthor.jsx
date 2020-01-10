import React, { Fragment } from 'react'
import useStyles from './postAuthorStyles'
import Avatar from '@material-ui/core/Avatar'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import PropTypes from 'prop-types'

import getDate from '../../../utils/date/getDate'

const PostAuthor = ( { author, owner, date } ) => {
  const classes = useStyles()

  return (
    <Fragment className={classes.root}>
      <div className={classes.user}>
        <Avatar className={classes.userPhoto} src={author.avatar} alt='User' />
        <div className={classes.userName}>
          <p className={classes.userFullname}>{author.firstName} {author.lastName} <ArrowRightIcon/> {owner.firstName} {owner.lastName}</p>
          <p className={classes.postDate}>{getDate(date)}</p>
        </div>
      </div>
    </Fragment>
  )
}

PostAuthor.propTypes = {
  author: PropTypes.object,
  owner: PropTypes.object,
  date: PropTypes.number,
}

export default PostAuthor