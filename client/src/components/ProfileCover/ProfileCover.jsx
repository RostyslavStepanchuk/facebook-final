import React, { Fragment, useState } from 'react'

import { Avatar, Button, Container, Modal, Tab, Tabs } from '@material-ui/core'
import useStyles from './profileCoverStyles'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import UpdateProfile from '../UpdateProfile/UpdateProfile'

const ProfileCover = ({ user }) =>  {


  const { avatar, firstName, lastName, profileCover } = user
  const classes = useStyles({profileCover})

  const [value, setValue] = useState('profile')
  const [ modalOpen, setModalOpen ] = useState(false)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleModal = () => {
    setModalOpen(!modalOpen)
  }

  return (
    <Fragment>
      <div className={classes.avatarBg}>
        <Avatar className={classes.avatarImg} src={avatar}/>
        <p className={classes.avatarName}>{firstName} {lastName}</p>
        <Button
          variant='contained'
          onClick={handleModal}
          className={classes.editProfileBtn}
        >
          <div className={classes.label}>
            <EditOutlinedIcon className={classes.icon}/>
            <div className={classes.labelText}> Edit profile</div>
          </div>
        </Button>
        <Modal
          disableAutoFocus
          open={modalOpen}
          onClose={handleModal}
        >
          <Container className={classes.modalContainer} maxWidth='md'>
          <UpdateProfile handleClose={handleModal}/>
          </Container>
        </Modal>
      </div>
      <Tabs value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            aria-label="icon label tabs"
            className={classes.submenu}>
        <Tab className={classes.submenuItem} label="Profile" value="profile" /> {/*icon={<AccountCircleIcon />}*/}
        <Tab className={classes.submenuItem} label="About" value="about" /> {/*icon={<PersonIcon />}*/}
        <Tab className={classes.submenuItem} label="Friends" value="friends" /> {/*icon={<SupervisorAccountIcon />}*/}
        <Tab className={classes.submenuItem} label="Photos" value="photos" /> {/*icon={<PhotoCameraIcon />}*/}
        <Tab className={classes.submenuItem} label="Messages" value="messages" /> {/*icon={<EmailIcon />}*/}
      </Tabs>
    </Fragment>
  )
}

ProfileCover.propTypes = {
  user: PropTypes.object,
}

const mapStateToProps = state => ({
  user: state.auth.user,
})

export default connect(mapStateToProps, null)(ProfileCover)