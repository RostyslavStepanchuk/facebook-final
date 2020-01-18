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
import useStyles from './friendsListStyles'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
import { getAvatarLink } from '../../utils/helpers/imageLinkHelpers'

const Transition = React.forwardRef(function Transition (props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

const FriendsList = ({ user }) => {
  const classes = useStyles()
  const [openDialog, setOpenDialog] = useState(false)
  const { friends } = user

  const handleModal = () => {
    setOpenDialog(!openDialog)
  }

  const handleModalDelete = () => {
    handleModal()
    //deleteFriend(postId)
  }

  const friendsList = friends.map( friend =>
    <Grid item xs={12} sm={6} className={classes.gridItem}>
      <div className={classes.friendAvatar}>
        <img src={getAvatarLink(friend.avatar)} className={classes.image} alt='Avatar'/>
      </div>
      <div className={classes.friendInfo}>
        <p className={classes.userName}>{friend.firstName} {friend.lastName}</p>
        <div>
          <Tooltip title="Send message">
            <IconButton color="primary" aria-label="Send message">
              <MailOutlineIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Remove friend">
            <IconButton color="secondary" onClick={handleModal} aria-label="Remove friend">
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
        Friends <span className={classes.count}>{friends.length}</span>
      </Typography>
      <Grid className={classes.gridContainer} container>
        {friendsList}
      </Grid>
    </div>
  )
}

FriendsList.propTypes = {
  user: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  user: state.auth.user,
})

export default connect(mapStateToProps, null)(FriendsList)
