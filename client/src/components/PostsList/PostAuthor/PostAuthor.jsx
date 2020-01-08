import React, { Fragment, Component } from 'react'
import useStyles from './postAuthorStyles'
import Avatar from '@material-ui/core/Avatar'

const PostAuthor = ( props ) => {
  const classes = useStyles()

  return (
    <Fragment className={classes.root}>
      <div className={classes.user}>
        <Avatar className={classes.user_photo} src={props.author.avatar} alt='User' />
        <div className={classes.user_name}>
          <p className={classes.user_fullname}>{props.author.firstName} {props.author.lastName}</p>
          <p className={classes.post_date}>post_date</p>
        </div>
      </div>
    </Fragment>
    )
}

export default PostAuthor