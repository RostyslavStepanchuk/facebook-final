import React, { Fragment } from 'react'
import useStyles from './postAuthorStyles'
import Avatar from '@material-ui/core/Avatar'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'

const PostAuthor = ( { author, owner, date} ) => {
  const classes = useStyles()

  const postDate = (dateMilliseconds) => {
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

  return (
    <Fragment className={classes.root}>
      <div className={classes.user}>
        <Avatar className={classes.user_photo} src={author.avatar} alt='User' />
        <div className={classes.user_name}>
          <p className={classes.user_fullname}>{author.firstName} {author.lastName} <ArrowRightIcon/> {owner.firstName} {owner.lastName}</p>
          <p className={classes.post_date}>{postDate(date)}</p>
        </div>
      </div>
    </Fragment>
  )
}

export default PostAuthor