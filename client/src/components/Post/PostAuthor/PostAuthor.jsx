import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Avatar } from '@material-ui/core'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import TaggedFriendsSelect from './TaggedFriendsSelect/TaggedFriendsSelect'
import PostMenu from './PostMenu/PostMenu'
import Grid from '@material-ui/core/Grid'

import useStyles from './postAuthorStyles'
import { getAvatarLink } from '../../../utils/helpers/imageLinkHelpers'
import { getFullName } from '../../../utils/helpers/formatters'
import { getDate } from '../../../utils/date/getDate'
import { get } from 'lodash'

const PostAuthor = ({ postId, author, owner, date, user, taggedFriends }) => {
  const classes = useStyles()

  let nextToUsernameLine = null
  let belowUsernameLine = null

  if (author.username !== owner.username) {
    nextToUsernameLine = <Fragment>
      <ArrowRightIcon className={classes.arrowRight} />
      <span>
        <Link to={`/profile/${get(owner, 'username')}`} className={classes.authorLink}>
          {getFullName(owner)}
        </Link>
      </span>
    </Fragment>
  }

  if (taggedFriends.length > 0) {
    const firstTagged = <Link to={'/profile/' + taggedFriends[0].username} className={classes.tagLink}>{`${taggedFriends[0].firstName} ${taggedFriends[0].lastName}`}</Link>
    const otherTaggedLine = taggedFriends.length > 1 ? <span>{'and '}<TaggedFriendsSelect taggedFriends={taggedFriends.slice(1)} /></span> : null
    const taggedFriendsLine = <Fragment><span>&nbsp;{'with '}{firstTagged} </span>&nbsp;<span>{otherTaggedLine}</span></Fragment>
    if (nextToUsernameLine === null) {
      nextToUsernameLine = taggedFriendsLine
    } else {
      belowUsernameLine = <p className={classes.lineBelowUsername}>{taggedFriendsLine}</p>
    }
  }

  return (
    <Grid container justify='space-between' >
      <Grid item className={classes.user}>
        <Link to={`/profile/${get(author, 'username')}`}>
          <Avatar className={classes.userPhoto} src={getAvatarLink(author)} alt='User' />
        </Link>
        <div className={classes.userName}>
          <p className={classes.userFullName}>
            <Link to={`/profile/${get(author, 'username')}`} className={classes.authorLink}>
              {getFullName(author)}
            </Link>
            {nextToUsernameLine}
          </p>
          {belowUsernameLine}
          <p className={classes.postDate}>{getDate(date)}</p>
        </div>
      </Grid>
      <Grid>
        <PostMenu
          postId={postId}
          author={author}
          owner={owner}
          user={user}
          taggedUsers={taggedFriends}
        />
      </Grid>
    </Grid>
  )
}

PostAuthor.propTypes = {
  postId: PropTypes.number.isRequired,
  author: PropTypes.object.isRequired,
  owner: PropTypes.object.isRequired,
  date: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
  taggedFriends: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  user: state.auth.user
})

export default connect(mapStateToProps, null)(PostAuthor)
