import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import useStyles from './commentStyles'
import PropTypes from 'prop-types'

import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

import { deleteComment } from '../../../../actions/post'
import { getDate } from '../../../../utils/date/getDate'

const Comment = ({ postId, owner, comment, user, deleteComment }) => {
  const classes = useStyles()

  const [showDeleteBtn, setShowDeleteBtn] = useState(false)
  const { id, author, message, date } = comment

  useEffect(
    () => setShowDeleteBtn(author.username === user.username || owner.username === user.username),
    [author.username, owner.username, user.username]
  )

  return (
    <div className={classes.panel}>
      <div className={classes.comment}>
        <p className={classes.commentText}><span className={classes.commentAuthor}>{author.firstName} {author.lastName}</span>{message}</p>
        <p className={classes.commentDate}>{getDate(date)}</p>
      </div>
      { showDeleteBtn &&
        <IconButton onClick={() => deleteComment(postId, id)} aria-label='delete'>
          <DeleteIcon fontSize='small' />
        </IconButton>
      }
    </div>
  )
}

Comment.propTypes = {
  postId: PropTypes.number.isRequired,
  comment: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  owner: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  user: state.auth.user
})

export default connect(mapStateToProps, { deleteComment })(Comment)
