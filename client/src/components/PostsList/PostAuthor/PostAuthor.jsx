import React, { Fragment } from 'react'
import useStyles from './postAuthorStyles'

const PostAuthor = ({ author })  => {
  const classes = useStyles()

  return (
    <Fragment className={classes.user}>
      <img className={classes.user_photo} src={author.avatar} alt='User' />
      <div className={classes.user_name}>
        <p className={classes.user_fullname}>{author.firstName} {author.lastName}</p>
        /*{<p className={classes.post_date}>post_date</p>}*/
      </div>
    </Fragment>
    )
}

export default PostAuthor