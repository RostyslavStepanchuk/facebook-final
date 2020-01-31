import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import useStyles from './postLikeStyles'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import { IconButton, Tooltip, Avatar } from '@material-ui/core'
import { updateLikes } from '../../../actions/post'
import { isEmpty } from 'lodash'
import { getAvatarLink } from '../../../utils/helpers/imageLinkHelpers'
import withStyles from '@material-ui/core/styles/withStyles'

const PostLikePanel = ({ postId, likes, comments, user, updateLikes, focusForCreatingComment }) => {
  const classes = useStyles()

  const [postIsLiked, setPostIsLiked] = useState(false)

  useEffect(
    () => setPostIsLiked(likes.some(like => like.username === user.username)),
    [likes, user.username]
  )

  const LikePanelTooltip = withStyles(theme => ({
    tooltip: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      fontSize: theme.typography.pxToRem(13),
      border: '1px solid #9ca6ae',
    },
  }))(Tooltip)

  const likedList = components => {
    if (isEmpty(components)) return <p className={classes.text}>Post has no likes</p>
    const listForRender = components.slice(0, 10)

    return listForRender.map(friend =>
      <div className={classes.container} key={friend.username}>
        <Avatar className={classes.userPhoto} src={getAvatarLink(friend.avatar)} alt='User' />
        <div className={classes.userContainer}>
          <p className={classes.text}>{friend.firstName} {friend.lastName}</p>
        </div>
      </div>
    )
  }

  return (
    <Fragment>
      <div className={classes.panel}>
        <LikePanelTooltip
          title={likedList(likes)}
          placement="left"
        >
          <IconButton onClick={() => updateLikes(postId)} aria-label='like' >
            { postIsLiked ? <FavoriteIcon color='secondary' /> : <FavoriteBorderIcon /> }
          </IconButton>
        </LikePanelTooltip>
        {likes.length}

        <LikePanelTooltip title="Create a comment?" placement="right">
          <IconButton onClick={focusForCreatingComment} aria-label='comments' >
            <ChatBubbleOutlineIcon />
          </IconButton>
        </LikePanelTooltip>
        {comments.length}
      </div>
    </Fragment>
  )
}

PostLikePanel.propTypes = {
  postId: PropTypes.number.isRequired,
  likes: PropTypes.array.isRequired,
  comments: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  updateLikes: PropTypes.func.isRequired,
  focusForCreatingComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  user: state.auth.user
})

export default connect(mapStateToProps, { updateLikes })(PostLikePanel)
