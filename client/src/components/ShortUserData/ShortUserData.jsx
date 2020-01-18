import React from 'react'
import useStyles from './shortUserDataStyles'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import { getDateForBirthday } from '../../utils/date/getDate'
import PropTypes from 'prop-types'

const ShortUserData = ({ user }) => {
  const classes = useStyles()

  const { email, birthDate, gender } = user

  return (
    <div className={classes.container}>
      <Typography className={classes.header} variant='subtitle1' component='div'>
        Short data
      </Typography>
      <div className={classes.textContainer}>
        <p><span className={classes.textSpan}>Gender:</span> {gender}</p>
        <p><span className={classes.textSpan}>Email:</span> {email}</p>
        <p><span className={classes.textSpan}>Birthday:</span> {getDateForBirthday(birthDate)}</p>
      </div>
    </div>
  )
}

ShortUserData.propTypes = {
  user: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  user: state.auth.user
})

export default connect(mapStateToProps, null)(ShortUserData)
