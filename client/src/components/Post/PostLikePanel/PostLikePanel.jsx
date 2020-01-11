import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import useStyles from './postLikeStyles'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import IconButton from '@material-ui/core/IconButton'

import { updateLikes } from '../../../actions/post'

const PostLikePanel = ({ post, user }) => {
  const classes = useStyles()

  const [count, setCount] = useState(post.likes.length)
  const [postIsLiked, setPostIsLiked] = useState(false)

  const postLikes = post.likes
  const username = user.username

  useEffect(
    () => setPostIsLiked(postLikes.some(like=>like.username === username)),
    [postLikes, username]
  )

  const changeLike = () =>  {
    if(postIsLiked){
      setPostIsLiked(false)
      setCount(count - 1)
      updateLikes(post.id)
    } else {
      setPostIsLiked(true)
      setCount(count + 1)
      updateLikes(post.id)
    }
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
        {post.comments.length}
      </div>
    </Fragment>
  )
}

PostLikePanel.propTypes = {
  user: PropTypes.object,
  post: PropTypes.object
}

const mapStateToProps = state => ({
  user: state.auth.user,
})

export default connect(mapStateToProps, null)(PostLikePanel)