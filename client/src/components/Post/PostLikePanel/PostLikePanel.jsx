import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import useStyles from './postLikeStyles'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import IconButton from '@material-ui/core/IconButton'

const PostLikePanel = ({ likes, comments, user}) => {
  const [count, setCount] = useState(likes.length)
  const [likeIt, setChangeForLike] = useState(false)
  const classes = useStyles()

  useEffect(
    () => {
      const userName = user.username
      likes.map( like => {
        if(like.username === userName) {
          setChangeForLike(true)
        }
      })
    },  []
  )

  const changeLike = () =>  {
    if(likeIt){
      setChangeForLike(false)
      setCount(count - 1)
    } else {
      setChangeForLike(true)
      setCount(count + 1)
    }
  }

  return (
    <Fragment className={classes.root}>
      <IconButton aria-label="like" onClick={changeLike}>
        { likeIt ? <FavoriteIcon color="secondary" /> : <FavoriteBorderIcon/> }
      </IconButton>
      {count}
      <IconButton aria-label="comments">
        <ChatBubbleOutlineIcon />
      </IconButton>
      {comments.length}
    </Fragment>
  )
}

PostLikePanel.propTypes = {
  user: PropTypes.object,
}

const mapStateToProps = state => ({
  user: state.auth.user,
})

const mapDispatchToProps = dispatch => {
  return {

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostLikePanel)