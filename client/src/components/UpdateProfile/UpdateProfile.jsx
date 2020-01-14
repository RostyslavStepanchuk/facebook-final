/* global URL */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import DateFnsUtils from '@date-io/date-fns'

import {
  Avatar,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@material-ui/core'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'

import useStyles from './updateProfileStyles'
import { PhotoCamera } from '@material-ui/icons'
import { areNoErrors, validateEmail } from '../../utils/helpers/inputValidators'
import { uploadSingleImage } from '../../actions/post'
import { updateProfile } from '../../actions/auth'

const UpdateProfile = ({ user, handleClose, updateProfile }) => {
  const { avatar, firstName, lastName, birthDate, email, profileCover, gender } = user

  const [ formData, setFormData ] = useState({
    avatar: {
      file: null,
      url: avatar.src
    },
    profileCover: {
      file: null,
      url: profileCover.src
    },
    firstName,
    lastName,
    email,
    birthDate: Number(birthDate),
    gender: gender,
    emailError: ''
  })

  const classes = useStyles({ profileCover: formData.profileCover.url })

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onBirthDateChange = date => {
    setFormData({ ...formData, birthDate: date.getTime() })
  }

  const getFileObject = e => {
    const file = e.target.files[0]
    return {
      file,
      url: URL.createObjectURL(file),
      uploadError: false
    }
  }

  const handleBackgroundChange = e => {
    const newBackground = getFileObject(e)
    setFormData({...formData, profileCover: newBackground})
  }

  const handleAvatarChange = e => {
    const newAvatar = getFileObject(e)
    setFormData({...formData, avatar: newAvatar})
  }

  const validateInput = () => {
    const errors = {}
    errors.emailError = validateEmail(formData.email)
    setFormData({ ...formData, ...errors })

    return areNoErrors(errors)
  }

  const sendImage = (newImg, currentImg) => {
    if (newImg.file) {
      return uploadSingleImage(newImg)
    }
    return Promise.resolve(currentImg)
  }

  const onSubmit = e => {
    e.preventDefault()

    const inputIsValid = validateInput()

    const images = {}

    if (inputIsValid) {
      const imgUploads = []
      imgUploads.push(sendImage(formData.avatar, avatar)
        .then(img => { images.avatar = img }))
      imgUploads.push(sendImage(formData.profileCover, profileCover)
        .then(img => { images.profileCover = img }))

      Promise.all(imgUploads).then(() => {
        const { firstName, lastName, gender, birthDate } = formData
        updateProfile(({ ...images, firstName, lastName, gender, birthDate }))
          .then(handleClose)
      })
    }
  }

  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <Typography variant='subtitle1' component='div' className={classes.header}>
        Edit profile
      </Typography>
      <div className={classes.avatarBg}>
        <input
          className={classes.hidden}
          id='bg-img-file'
          type='file'
          onChange={handleBackgroundChange}
        />
        <label htmlFor='bg-img-file'>
          <IconButton
            color='primary'
            className={`${classes.uploadImgBtn} ${classes.uploadBgBtn}`}
            aria-label='upload picture'
            component='span'>
            <PhotoCamera />
          </IconButton>
        </label>
        <div className={classes.avatarContainer}>
          <Avatar className={classes.avatarImg} src={formData.avatar.url} />
          <input
            className={classes.hidden}
            id='avatar-img-file'
            type='file'
            onChange={handleAvatarChange}
          />
          <label htmlFor='avatar-img-file'>
            <IconButton
              color='primary'
              className={`${classes.uploadImgBtn} ${classes.uploadAvatarBtn}`}
              aria-label='upload picture'
              component='span'>
              <PhotoCamera />
            </IconButton>
          </label>
        </div>
      </div>

      <Typography variant='subtitle1' component='div' className={classes.header}>
        Personal info
      </Typography>
      <Grid container className={classes.sectionContainer}>
        <Grid item xs={12} sm>
          <TextField
            className={classes.textInput}
            name='firstName'
            variant='outlined'
            required
            fullWidth
            label='First name'
            value={formData.firstName}
            onChange={onChange}
          />
          <TextField
            className={classes.textInput}
            name='lastName'
            variant='outlined'
            required
            fullWidth
            label='Last name'
            value={formData.lastName}
            onChange={onChange}
          />
        </Grid>
        <Grid item alignContent='center' justify='center' container xs={6} sm={3} md={2} >
          <FormControl component='fieldset' className={classes.ageRadioSet} >
            <FormLabel component='legend'>Gender</FormLabel>
            <RadioGroup aria-label='gender' name='gender' value={formData.gender} onChange={onChange}>
              <FormControlLabel
                value='FEMALE'
                control={<Radio color='primary' size='small' />}
                label='Female'
                className={classes.ageRadioBtn}
              />
              <FormControlLabel
                value='MALE'
                control={<Radio color='primary' size='small' />}
                label='Male'
                className={classes.ageRadioBtn}
              />
              <FormControlLabel
                value='OTHER'
                control={<Radio color='primary' size='small' />}
                label='Other'
                className={classes.ageRadioBtn}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item alignContent='center' justify='center' container xs={6} sm >
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant='inline'
              format='dd/MM/yyyy'
              margin='normal'
              name='birthDate'
              id='date-picker-inline'
              label='Birth date'
              value={new Date(formData.birthDate)}
              onChange={onBirthDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item container alignContent='center' xs={12} md>
          <TextField
            name='email'
            variant='outlined'
            required
            fullWidth
            label='email'
            value={formData.email}
            onChange={onChange}
            error={formData.emailError !== ''}
            helperText={formData.emailError}
          />
        </Grid>
      </Grid>
      <Grid container alignContent='center' justify='flex-end' className={classes.btnSection}>
        <Button
          variant='contained'
          size='small'
          onClick={handleClose}
          className={classes.summaryBtn}
        >
          cancel
        </Button>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          size='large'
          className={classes.summaryBtn}
        >
          save changes
        </Button>
      </Grid>
    </form>

  )
}

UpdateProfile.propTypes = {
  user: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired

}

const mapStateToProps = state => ({
  user: state.auth.user
})

const mapDispatchToProps = dispatch => ({
  updateProfile: (formData) => dispatch(updateProfile(formData))
})

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfile)
