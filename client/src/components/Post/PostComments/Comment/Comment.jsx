import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import useStyles from './commentStyles'
import PropTypes from 'prop-types'

import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

import { deleteComment } from '../../../../actions/post'
import { getDate } from '../../../../utils/date/getDate'
import { getFullName } from '../../../../utils/helpers/formatters'
import { get } from 'lodash'
import { Avatar } from '@material-ui/core'
import { getAvatarLink } from '../../../../utils/helpers/imageLinkHelpers'
import { Link } from 'react-router-dom'
import Box from '@material-ui/core/Box'

const Comment = ({ postId, postOwner, comment, user, deleteComment }) => {
  const classes = useStyles()

  const [showDeleteBtn, setShowDeleteBtn] = useState(false)
  const { id, author, message, date } = comment

  useEffect(
    () => setShowDeleteBtn(author.username === user.username || postOwner.username === user.username),
    [author.username, postOwner.username, user.username]
  )

  return (
    <div className={classes.panel}>
      <Box display='flex'>
        <Link to={`/profile/${get(author, 'username')}`}>
          <Avatar src={getAvatarLink(author.avatar)} alt='User' />
        </Link>
        <div className={classes.comment}>
          <p className={classes.commentText}>
            <Link to={`/profile/${get(author, 'username')}`} className={classes.link}>
              <span className={classes.commentAuthor}>
                {getFullName(author)}
              </span>
            </Link>
            {message}
          </p>
          <p className={classes.commentDate}>{getDate(date)}</p>
        </div>
      </Box>
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
  postOwner: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  user: state.auth.user
})

export default connect(mapStateToProps, { deleteComment })(Comment)
