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
import { KeyboardDatePicker, MuiPickersUtilsProvider, } from '@material-ui/pickers'

import useStyles from './updateProfileStyles'
import { PhotoCamera } from '@material-ui/icons'
import { validateEmail } from '../../utils/helpers/inputValidators'

const UpdateProfile = ({user, handleClose}) => {

  const { avatar, firstName, lastName, birthDate, email, profileCover } = user
  const classes = useStyles({ profileCover })

  const [ formData, setFormData ] = useState({
    firstName,
    lastName,
    email,
    birthDate: Number(birthDate),
    gender: 'male',
    emailError: '',

  });

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onBirthDateChange = date => {
    setFormData({ ...formData, birthDate: date.getTime()})
  }

  const onSubmit = e => {
    e.preventDefault()

    setFormData({...formData, emailError: validateEmail(formData.email) })

    if (formData.emailError === '') {
      console.log('loading to server')
    }
  }


  return (
    <form className={classes.form} onSubmit={onSubmit}>
      <Typography variant='subtitle1' component='div' className={classes.header}>
        Edit profile
      </Typography>
      <div className={classes.avatarBg}>
        <input accept='image/*' className={classes.hidden} id='bg-img-file' type='file' />
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
          <Avatar className={classes.avatarImg} src={avatar}/>
          <input accept='image/*' className={classes.hidden} id='avatar-img-file' type='file' />
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
                value='female'
                control={<Radio color='primary' size='small' />}
                label='Female'
                className={classes.ageRadioBtn}
              />
              <FormControlLabel
                value='male'
                control={<Radio color='primary' size='small' />}
                label='Male'
                className={classes.ageRadioBtn}
              />
              <FormControlLabel
                value='other'
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
                'aria-label': 'change date',
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
  handleClose: PropTypes.func.isRequired

}

const mapStateToProps = state => ({
  user: state.auth.user,
})


export default connect(mapStateToProps,null)(UpdateProfile)