import React, { Fragment, useState } from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  Slide,
  Tooltip
} from '@material-ui/core'
import PropTypes from 'prop-types'
import useStyles from './friendsListItemStyles'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import { confirmRequest, deleteFriend, deleteRequest } from '../../../actions/auth'
import { getDateWithoutTime } from '../../../utils/date/getDate'
import { getAvatarLink } from '../../../utils/helpers/imageLinkHelpers'
import Tile from '../../Tile/Tile'
import { connect } from 'react-redux'

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const FriendsListItem = ({ friend, deleteFriend, request, confirmRequest, deleteRequest }) => {
  const classes = useStyles()
  const [openDialog, setOpenDialog] = useState(false)

  const handleModal = () => {
    setOpenDialog(!openDialog)
  }

  const handleModalDeleteFriend = friendUsername => {
    handleModal()
    deleteFriend(friendUsername)
  }

  const handleModalDeleteRequest = requestId => {
    handleModal()
    deleteRequest(requestId)
  }

  return (
    <Fragment>
      { friend &&
      <Grid item sm={5} className={classes.gridItem}>
        <Tile imageSrc={getAvatarLink(friend.avatar)} />
        <div className={classes.friendInfo}>
          <p className={classes.userName}>{friend.firstName} {friend.lastName}</p>
          <div>
            <Tooltip title='Send message'>
              <IconButton color='primary' aria-label='Send message'>
                <MailOutlineIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title='Remove friend'>
              <IconButton color='secondary' onClick={handleModal} aria-label='Remove friend'>
                <HighlightOffIcon />
              </IconButton>
            </Tooltip>
            <Dialog
              open={openDialog}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleModal}
            >
              <DialogTitle id='alert'>Delete friend</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to delete friend?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button variant='contained' color='primary' onClick={handleModal}>
                  Cancel
                </Button>
                <Button variant='contained' color='secondary' onClick={() => handleModalDeleteFriend(friend.username)}>
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </Grid>
    }
      { request &&
      <Grid item sm={5} className={classes.gridItem}>
        <Tile imageSrc={getAvatarLink(request.requester.avatar)} />
        <div className={classes.friendInfo}>
          <div>
            <p className={classes.userName}>{request.requester.firstName} {request.requester.lastName}</p>
            <p className={classes.requestDate}>{getDateWithoutTime(request.date)}</p>
          </div>
          <div>
            <Tooltip title='Send message'>
              <IconButton color='primary' aria-label='Send message'>
                <MailOutlineIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title='Confirm request'>
              <IconButton className={classes.confirmBtn} onClick={() => confirmRequest(request.id)} aria-label='Confirm'>
                <CheckCircleOutlineIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title='Delete request'>
              <IconButton color='secondary' onClick={handleModal} aria-label='Delete'>
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
                <Button variant='contained' color='secondary' onClick={() => handleModalDeleteRequest(request.id)}>
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      </Grid>
    }
    </Fragment>
  )
}

FriendsListItem.propTypes = {
  friend: PropTypes.object,
  request: PropTypes.object,
  deleteFriend: PropTypes.func.isRequired,
  confirmRequest: PropTypes.func.isRequired,
  deleteRequest: PropTypes.func.isRequired
}

export default connect(null, { deleteFriend, confirmRequest, deleteRequest })(FriendsListItem)