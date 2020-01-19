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
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import { getAvatarLink } from '../../utils/helpers/imageLinkHelpers'
import { confirmRequest, deleteRequest } from '../../actions/auth'
import { getDateWithoutTime } from '../../utils/date/getDate'

import Tile from '../Tile/Tile'

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const FriendRequestsList = ({ user, confirmRequest, deleteRequest }) => {
  const classes = useStyles()
  const [openDialog, setOpenDialog] = useState(false)
  const { incomingFriendRequests } = user

  const handleModal = () => {
    setOpenDialog(!openDialog)
  }

  const handleModalDelete = requestId => {
    handleModal()
    deleteRequest(requestId)
  }

  const requestList = incomingFriendRequests.map((request) =>
    <Grid item sm={5} className={classes.gridItem} key={request.id}>
      <Tile imageSrc={getAvatarLink(request.requester.avatar)} />
      <div className={classes.friendInfo}>
        <div>
          <p className={classes.friendName}>{request.requester.firstName} {request.requester.lastName}</p>
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
              <Button variant='contained' color='secondary' onClick={() => handleModalDelete(request.id)}>
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
      <Typography className={classes.header} variant='subtitle1' component='div'>
        Friend requests <span className={classes.count}>{incomingFriendRequests.length}</span>
      </Typography>
      <Grid className={classes.gridContainer} container>
        {requestList}
      </Grid>
    </div>
  )
}

FriendRequestsList.propTypes = {
  user: PropTypes.object.isRequired,
  confirmRequest: PropTypes.func.isRequired,
  deleteRequest: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  user: state.auth.user
})

export default connect(mapStateToProps, { confirmRequest, deleteRequest })(FriendRequestsList)
