import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import useStyles from './postLikeStyles'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline'
import IconButton from '@material-ui/core/IconButton'

import { updateLikes } from '../../../actions/post'
import { forEach } from 'lodash'

const PostLikePanel = ({ id, likes, comments, user, updateLikes}) => {
  const classes = useStyles()

  const [count, setCount] = useState(likes.length)
  const [postIsLiked, setPostIsLiked] = useState(false)

  const username = user.username

  useEffect(() => {
     forEach(likes, like => {
        if (like.username === username) {
          setPostIsLiked(true)
          return false
        }
      })
    },[likes, username]
  )

  const changeLike = () =>  {
    if(postIsLiked){
      setPostIsLiked(false)
      setCount(count - 1)
    } else {
      setPostIsLiked(true)
      setCount(count + 1)
    }
    updateLikes(id)
  }

  return (
    <Fragment className={classes.root}>
      <div className={classes.container}>
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
  id: PropTypes.number,
  likes: PropTypes.array,
  comments: PropTypes.array,
  user: PropTypes.object,
  updateLikes: PropTypes.func,
}

const mapStateToProps = state => ({
  user: state.auth.user,
})

export default connect(mapStateToProps, { updateLikes } )(PostLikePanel)