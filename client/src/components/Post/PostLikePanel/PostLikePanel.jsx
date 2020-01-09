import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import useStyles from './postLikeStyles'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import IconButton from '@material-ui/core/IconButton'

import { uploadLikes } from '../../../actions/post'

const PostLikePanel = ({ post, user, uploadLikes}) => {
  const [count, setCount] = useState(post.likes.length)
  const [likeIt, setChangeForLike] = useState(false)
  const classes = useStyles()

  const postLikes = post.likes
  const username = user.username

  useEffect(
    () => {
      postLikes.forEach(like => {
        if (like.username === username) {
          setChangeForLike(true)
        }
      })
    },[postLikes, username]
  )

  const changeLike = () =>  {
    if(likeIt){
      setChangeForLike(false)
      setCount(count - 1)
      uploadLikes(post.id)
    } else {
      setChangeForLike(true)
      setCount(count + 1)
      uploadLikes(post.id)
    }
  }

  return (
    <Fragment className={classes.root}>
      <div className={classes.panel}>
        <IconButton aria-label="like" onClick={changeLike}>
          { likeIt ? <FavoriteIcon color="secondary" /> : <FavoriteBorderIcon/> }
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
  post: PropTypes.object,
  uploadLikes: PropTypes.func,
}

const mapStateToProps = state => ({
  user: state.auth.user,
})

export default connect(mapStateToProps, { uploadLikes } )(PostLikePanel)