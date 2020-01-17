import React, { useEffect } from 'react'
import { Typography, Grid } from '@material-ui/core'
import useStyles from './profileFieldStyles'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Preloader from '../Preloader/Preloader'
import { getUserPhotos } from '../../actions/image'

const ProfileField = ({ user, fieldName, loadUserPhotos, userPhotos, loading }) => {
  const classes = useStyles()
  const { friends } = user

  let listForRender = []

  useEffect(() => {
    switch (fieldName) {
      case 'Photos':
        // loadUserPhotos()
        // listForRender = userPhotos
        break
      case 'Friends':
        listForRender = friends
        break
      default:
        throw new Error('FieldName is not defined')
    }
  }, [fieldName, listForRender, loadUserPhotos])

  const fieldComponents = (components) => {
    return components.map((item, index) => {
      if (index < 9) {
        return (
          <Grid item xs={4}>
            <div className={classes.gridItem}>
              { fieldName === "Photos" &&
                <img src={item.src} className={classes.image} alt='Image'/>
              }
              { fieldName === "Friends" &&
                <>
                  <img src={item.avatar.src} className={classes.image} alt='Image'/>
                  <p className={classes.userName}>{item.firstName} {item.lastName}</p>
                </>
              }
            </div>
          </Grid>
        )
      }
    })
  }

  const content = (fieldName === "Friends") ? fieldComponents(friends)
    : (loading ? <Preloader /> : fieldComponents(userPhotos))

  return (
    <div className={classes.container}>
      <Typography className={classes.header}  variant='subtitle1' component='div'>
        {fieldName} <span className={classes.count}>length</span>
      </Typography>
      <Grid className={classes.gridContainer} container spacing={1}>
        {content}
      </Grid>
    </div>
  )
}

ProfileField.propTypes = {
  user: PropTypes.object.isRequired,
  fieldName: PropTypes.oneOf(['Photos', 'Friends']).isRequired,
  loadUserPhotos: PropTypes.func.isRequired,
  userPhotos: PropTypes.array,
  loading: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  user: state.auth.user,
  userPhotos: state.images.userPhotos,
  loading: state.images.loading
})

const mapDispatchToProps = dispatch => {
  return {
    loadUserPhotos: () => dispatch(getUserPhotos()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileField)

