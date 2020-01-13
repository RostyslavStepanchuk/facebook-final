import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Avatar,
  IconButton,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Dialog,
  Slide } from '@material-ui/core'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import DeleteIcon from '@material-ui/icons/Delete'
import useStyles from './postAuthorStyles'
import PropTypes from 'prop-types'

import getDate from '../../../utils/date/getDate'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const PostAuthor = ( { author, owner, date, user } ) => {
  const classes = useStyles()

  const [showDeleteBtn, setShowDeleteBtn] = useState(false)
  const [openDialog, setOpenDialog] = React.useState(false)
  const username = user.username

  useEffect(
    () => setShowDeleteBtn(author.username === username || owner.username === username),
    [author.username, owner.username, username]
  )

  const handleClickOpen = () => {
    setOpenDialog(true)
  }

  const handleClose = () => {
    setOpenDialog(false)
  }

  return (
    <Fragment>
      <div className={classes.user}>
        <Avatar className={classes.userPhoto} src={author.avatar} alt='User' />
        <div className={classes.userName}>
          <p className={classes.userFullname}>{author.firstName} {author.lastName} <ArrowRightIcon/> {owner.firstName} {owner.lastName}</p>
          <p className={classes.postDate}>{getDate(date)}</p>
        </div>
        { showDeleteBtn && <IconButton className={classes.btnDelete} aria-label="delete" onClick={handleClickOpen}>
          <DeleteIcon />
        </IconButton> }
        <Dialog
          open={openDialog}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
        >
          <DialogTitle id="alert">Delete Post?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to permanently remove this post from DanBook?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="primary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" color="secondary" onClick={handleClose}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Fragment>
  )
}

PostAuthor.propTypes = {
  author: PropTypes.object.isRequired,
  owner: PropTypes.object.isRequired,
  date: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  user: state.auth.user,
})

export default connect(mapStateToProps, null)(PostAuthor)