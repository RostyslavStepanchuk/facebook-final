import React, { useEffect } from 'react'
import { Typography, Grid } from '@material-ui/core'
import useStyles from './profileFieldStyles'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Preloader from '../Preloader/Preloader'
import Tile from '../Tile/Tile'
import { getUserPhotosFromPosts } from '../../actions/image'
import { getAvatarLink } from '../../utils/helpers/imageLinkHelpers'

const ProfileField = ({ user, fieldName,  loadUserPhotos, userPhotos, loading }) => {
  const classes = useStyles()
  const { friends } = user

  useEffect(() => {
    if (fieldName === 'Photos') loadUserPhotos()
  }, [fieldName, loadUserPhotos])

  const fieldComponents = components => {
    let listForRender = components.slice(0, 9)
    switch (fieldName) {
      case 'Photos': {
        return listForRender.map( photo => <Tile imageSrc={photo.src} key={photo.id}/>)
      }
      case 'Friends': {
        return listForRender.map( friend => <Tile imageSrc={getAvatarLink(friend.avatar)} title={friend.firstName + ' ' + friend.lastName} key={friend.avatar.id}/>)
      }
      default:
    }
  }


  const content = (fieldName === "Friends")
    ? fieldComponents(friends)
    : (loading ? <Preloader /> : fieldComponents(userPhotos))

  return (
    <div className={classes.container}>
      <Typography className={classes.header}  variant='subtitle1' component='div'>
        {fieldName} <span className={classes.count}>{fieldName === "Photos" ? userPhotos.length : friends.length}</span>
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
    loadUserPhotos: () => dispatch(getUserPhotosFromPosts()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileField)

