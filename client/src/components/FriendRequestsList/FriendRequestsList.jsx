import React, { useState } from 'react'
import {
  Button, Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Slide,
  Typography
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import useStyles from './friendRequestsListStyles'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const FriendRequestsList = ({ user }) => {
  const classes = useStyles()
  const [openDialog, setOpenDialog] = useState(false)
  const { incomingFriendRequests } = user

  const handleModal = () => {
    setOpenDialog(!openDialog)
  }

  const handleModalDelete = () => {
    handleModal()
    //deleteFriendRequest(postId)
  }

  const friendsList = incomingFriendRequests.map((request) =>
    <Grid item xs={12} sm={6} className={classes.gridItem}>
      <div className={classes.friendAvatar}>
        <img src={request.requester.avatar.src} className={classes.image} alt='Avatar'/>
      </div>
      <div className={classes.friendInfo}>
        <p className={classes.userName}>{request.requester.firstName} {request.requester.lastName}</p>
        <div>
          <Tooltip title="Send message">
            <IconButton color="primary" aria-label="Send message">
              <MailOutlineIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Confirm request">
            <IconButton className={classes.confirmBtn} aria-label="Confirm">
              <CheckCircleOutlineIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete request">
            <IconButton color="secondary" onClick={handleModal} aria-label="Delete">
              <HighlightOffIcon />
            </IconButton>
          </Tooltip>
          <Dialog
            open={openDialog}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleModal}
          >
            <DialogTitle id='alert'>Delete friend request</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete friend request?
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
      </div>
    </Grid>
  )

  return (
    <div className={classes.container}>
      <Typography className={classes.header}  variant='subtitle1' component='div'>
        Friend requests <span className={classes.count}>{incomingFriendRequests.length}</span>
      </Typography>
      <Grid className={classes.gridContainer} container>
        {friendsList}
      </Grid>
    </div>
  )
}

FriendRequestsList.propTypes = {
  user: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  user: state.auth.user,
})

export default connect(mapStateToProps, null)(FriendRequestsList)

