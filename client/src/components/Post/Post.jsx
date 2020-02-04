import React, { useRef, useState } from 'react'
import Paper from '@material-ui/core/Paper'
import PropTypes from 'prop-types'
import useStyles from './postStyles'

import PostAuthor from './PostAuthor/PostAuthor'
import PostLikePanel from './PostLikePanel/PostLikePanel'
import PostComments from './PostComments/PostComments'
import { get } from 'lodash'
import UpdatePost from './UpdatePost/UpdatePost'

const Post = ({ post }) => {
  const classes = useStyles()

  const { id, author, owner, date, message, image, likes, comments, taggedFriends } = post

  const inputRef = useRef(null)
  const focusForCreatingComment = () => {
    inputRef.current.focus()
  }

  // Update post dialog
  const [openUpdateWindow, setOpenUpdateWindow] = useState(false)
  const updateRef = React.useRef(null)

  const handleToggleUpdate = (e) => {
    e.preventDefault()
    setOpenUpdateWindow(prevOpen => !prevOpen)
  }

  return (
    <Paper key={id} className={classes.post}>
      <PostAuthor
        postId={id}
        author={author}
        owner={owner}
        date={date}
        taggedFriends={taggedFriends}
        updateRef={updateRef}
        openUpdateWindow={openUpdateWindow}
        handleToggleUpdate={handleToggleUpdate}
      />
      {image && <img src={get(image, 'src')} className={classes.postImg} alt='Post' />}
      <p>{message}</p>
      <PostLikePanel postId={id} likes={likes} comments={comments} focusForCreatingComment={focusForCreatingComment} />
      <PostComments postId={id} postOwner={owner} comments={comments} inputRef={inputRef} />
      <UpdatePost
        post={post}
        openUpdateWindow={openUpdateWindow}
        setOpenUpdateWindow={setOpenUpdateWindow}
        updateRef={updateRef}
      />
    </Paper>
  )
}

Post.propTypes = {
  post: PropTypes.object.isRequired
}

export default Post
