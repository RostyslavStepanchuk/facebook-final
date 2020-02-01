import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Slide
} from '@material-ui/core'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import DeleteIcon from '@material-ui/icons/Delete'
import useStyles from './postAuthorStyles'
import PropTypes from 'prop-types'

import { deletePost } from '../../../actions/post'
import { getDate } from '../../../utils/date/getDate'
import { getAvatarLink } from '../../../utils/helpers/imageLinkHelpers'
import { Link } from 'react-router-dom'
import TaggedFriendsSelect from './TaggedFriendsSelect/TaggedFriendsSelect'
import { getFullName } from '../../../utils/helpers/formatters'
import { get } from 'lodash'

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const PostAuthor = ({ postId, author, owner, date, user, deletePost, taggedFriends }) => {
  const classes = useStyles()

  const [showDeleteBtn, setShowDeleteBtn] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)

  useEffect(
    () => setShowDeleteBtn(author.username === user.username || owner.username === user.username),
    [author.username, owner.username, user.username]
  )

  const handleModal = () => {
    setOpenDialog(!openDialog)
  }

  const handleModalDelete = () => {
    handleModal()
    deletePost(postId)
  }

  let nextToUsernameLine = null
  let belowUsernameLine = null

  if (author.username !== owner.username) {
    nextToUsernameLine = <Fragment><ArrowRightIcon className={classes.arrowRight} /> <span>{getFullName(owner)}</span> </Fragment>
  }
  if (taggedFriends.length > 0) {
    const firstTagged = <Link to={'/profile/' + taggedFriends[0].username} className={classes.tagLink}>{`${taggedFriends[0].firstName} ${taggedFriends[0].lastName}`}</Link>
    const otherTaggedLine = taggedFriends.length > 1 ? <span>{'and '}<TaggedFriendsSelect taggedFriends={taggedFriends.slice(1)} /></span> : null
    const taggedFriendsLine = <Fragment><span>&nbsp;{'with '}{firstTagged} </span>&nbsp;<span>{otherTaggedLine}</span></Fragment>
    if (nextToUsernameLine === null) {
      nextToUsernameLine = taggedFriendsLine
    } else {
      belowUsernameLine = <p className={classes.lineBelowUsername}>{taggedFriendsLine}</p>
    }
  }
  return (
    <Fragment>
      <div className={classes.user}>
        <Link to={`/profile/${get(author, 'username')}`}>
          <Avatar className={classes.userPhoto} src={getAvatarLink(author.avatar)} alt='User' />
        </Link>
        <div className={classes.userName}>
          <p className={classes.userFullName}>
            <Link to={`/profile/${get(author, 'username')}`} className={classes.authorLink}>
              {getFullName(author)}
            </Link>
            {nextToUsernameLine}
          </p>
          {belowUsernameLine}
          <p className={classes.postDate}>{getDate(date)}</p>
        </div>
        { showDeleteBtn &&
          <IconButton className={classes.btnDelete} onClick={handleModal} aria-label='delete' >
            <DeleteIcon />
          </IconButton>
        }
        <Dialog
          open={openDialog}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleModal}
        >
          <DialogTitle id='alert'>Delete Post?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to permanently remove this post from DanBook?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant='contained' color='primary' onClick={handleModal}>
              Cancel
            </Button>
            <Button variant='contained' color='secondary' onClick={handleModalDelete}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Fragment>
  )
}

PostAuthor.propTypes = {
  postId: PropTypes.number.isRequired,
  author: PropTypes.object.isRequired,
  owner: PropTypes.object.isRequired,
  date: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  taggedFriends: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
  user: state.auth.user
})

export default connect(mapStateToProps, { deletePost })(PostAuthor)
