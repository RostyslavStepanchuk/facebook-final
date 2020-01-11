import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import useStyles from './postLikeStyles'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import IconButton from '@material-ui/core/IconButton'

import { updateLikes } from '../../../actions/post'

const PostLikePanel = ({ postId, likes, comments, user }) => {
  const classes = useStyles()

  const [count, setCount] = useState(likes.length)
  const [postIsLiked, setPostIsLiked] = useState(false)

  const username = user.username

  useEffect(
    () => setPostIsLiked(likes.some(like=>like.username === username)),
    [likes, username]
  )

  const changeLike = () =>  {
    if(postIsLiked){
      setPostIsLiked(false)
      setCount(count - 1)
    } else {
      setPostIsLiked(true)
      setCount(count + 1)
    }
    updateLikes(postId)
  }

  return (
    <Fragment>
      <div className={classes.panel}>
        <IconButton aria-label="like" onClick={changeLike}>
          { postIsLiked ? <FavoriteIcon color="secondary" /> : <FavoriteBorderIcon/> }
        </IconButton>
        {count}
        <IconButton aria-label="comments">
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
}

const mapStateToProps = state => ({
  user: state.auth.user,
})

export default connect(mapStateToProps, null)(PostLikePanel)