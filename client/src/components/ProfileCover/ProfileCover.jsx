import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Avatar, Button, Container, Modal, Tab, Tabs } from '@material-ui/core'
import ManageFriendshipButton from '../ManageFriendshipButton/ManageFriendshipButton'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'

import UpdateProfile from '../UpdateProfile/UpdateProfile'
import { getAvatarLink, getProfileCoverLink } from '../../utils/helpers/imageLinkHelpers'
import { getFullName } from '../../utils/helpers/formatters'

import useStyles from './profileCoverStyles'
import { changeTab } from '../../actions/profileTab'
import { connect } from 'react-redux'
import { getUserPhotosFromPosts } from '../../actions/image'
import { getPostsForProfile } from '../../actions/post'
import { getUserProfile } from '../../actions/search'
import { getIncomingFriendRequests, loadUserFriends } from '../../actions/friends'

const ProfileCover = ({ profileOwner, isOwnProfile, selectedTab, changeTab }) => {
  const classes = useStyles({profileCover: getProfileCoverLink(profileOwner)})

  const [ modalOpen, setModalOpen ] = useState(false)

  const handleModal = () => {
    setModalOpen(!modalOpen)
  }

  const handleChangeTab = (event, value) => {
    changeTab(value)
  }

  return (
    <div className={classes.container}>
      <div className={classes.avatarBg}>
        <Avatar className={classes.avatarImg} src={getAvatarLink(profileOwner)} />
        <p className={classes.avatarName}>{getFullName(profileOwner)}</p>
        {isOwnProfile && (<Button
          variant='contained'
          onClick={handleModal}
          className={classes.editProfileBtn}
        >
          <div className={classes.label}>
            <EditOutlinedIcon className={classes.icon} />
            <div className={classes.labelText}> Edit profile</div>
          </div>
        </Button>)}
        {!isOwnProfile && <ManageFriendshipButton profileOwner={profileOwner} />}
        <Modal
          disableAutoFocus
          open={modalOpen}
          onClose={handleModal}
        >
          <Container className={classes.modalContainer} maxWidth='md'>
            <UpdateProfile handleClose={handleModal} />
          </Container>
        </Modal>
      </div>
      <Tabs value={selectedTab}
        onChange={handleChangeTab}
        indicatorColor='primary'
        textColor='primary'
        aria-label='icon label tabs'
        className={classes.submenu}>
        <Tab className={classes.submenuItem}
          label='Timeline'
          value='timeline' />
        <Tab className={classes.submenuItem}
          label={'Friend requests'}
          value='friend requests' />
        <Tab className={classes.submenuItem}
          label={'Friends'}
          value='friends' />
        <Tab className={classes.submenuItem}
          label='Photos'
          value='photos' />
        <Tab className={classes.submenuItem}
          label='Messages'
          value='messages' />
      </Tabs>
    </div>
  )
}

ProfileCover.propTypes = {
  profileOwner: PropTypes.object.isRequired,
  profileTab: PropTypes.string.isRequired,
  handleChangeTab: PropTypes.func.isRequired,
  isOwnProfile: PropTypes.bool.isRequired,
  changeTab: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  changeTab: (value) => dispatch(changeTab(value))
})

export default connect(null, mapDispatchToProps)(ProfileCover)
