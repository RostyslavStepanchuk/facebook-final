import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import useStyles from './postLikeStyles'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import IconButton from '@material-ui/core/IconButton'

import { updateLikes } from '../../../actions/post'

const PostLikePanel = ({ postId, likes, comments, user, updateLikes, focusForCreatingComment } ) => {
  const classes = useStyles()

  const [postIsLiked, setPostIsLiked] = useState(false)

  useEffect(
    () => setPostIsLiked(likes.some(like=>like.username === user.username)),
    [likes, user.username]
  )

  return (
    <Fragment>
      <div className={classes.panel}>
        <IconButton onClick={() => updateLikes(postId)} aria-label="like" >
          { postIsLiked ? <FavoriteIcon color="secondary" /> : <FavoriteBorderIcon/> }
        </IconButton>
        {likes.length}
        <IconButton onClick={focusForCreatingComment} aria-label="comments" >
          <ChatBubbleOutlineIcon />
        </IconButton>
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
  focusForCreatingComment: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  user: state.auth.user
})

export default connect(mapStateToProps, { updateLikes })(PostLikePanel)