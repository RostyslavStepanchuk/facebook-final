import React, { useState } from 'react'

import { Avatar, Button, Container, Modal, Tab, Tabs } from '@material-ui/core'
import useStyles from './profileCoverStyles'
import PropTypes from 'prop-types'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import UpdateProfile from '../UpdateProfile/UpdateProfile'
import { getAvatarLink, getProfileCoverLink } from '../../utils/helpers/imageLinkHelpers'
import ManageFriendshipButton from '../ManageFriendshipButton/ManageFriendshipButton'

const ProfileCover = ({ profileOwner, isOwnProfile, profileTab, handleChangeTab }) => {
  const { avatar, firstName, lastName, profileCover } = profileOwner
  const classes = useStyles({profileCover: getProfileCoverLink(profileCover)})

  const [ modalOpen, setModalOpen ] = useState(false)

  const handleModal = () => {
    setModalOpen(!modalOpen)
  }

  return (
    <div className={classes.container}>
      <div className={classes.avatarBg}>
        <Avatar className={classes.avatarImg} src={getAvatarLink(avatar)} />
        <p className={classes.avatarName}>{firstName} {lastName}</p>
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
      <Tabs value={profileTab}
        onChange={handleChangeTab}
        indicatorColor='primary'
        textColor='primary'
        aria-label='icon label tabs'
        className={classes.submenu}>
        <Tab className={classes.submenuItem}
          label='Your story '
          value='your story' />
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
  isOwnProfile: PropTypes.bool.isRequired
}

export default ProfileCover
