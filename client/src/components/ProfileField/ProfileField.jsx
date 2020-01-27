import React, { Fragment } from 'react'
import { Grid, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import Preloader from '../Preloader/Preloader'
import Tile from '../Tile/Tile'
import { getAvatarLink } from '../../utils/helpers/imageLinkHelpers'

import useStyles from './profileFieldStyles'

const ProfileField = ({ friends, userPhotos, loadingPhotos }) => {
  const classes = useStyles()

  const fieldComponents = components => {
    if (isEmpty(components)) return
    const listForRender = components.slice(0, 9)

    if (friends) {
      return listForRender.map(friend => (
        <Tile
          imageSrc={getAvatarLink(friend.avatar)}
          title={friend.firstName + ' ' + friend.lastName}
          key={friend.id} />))
    } else {
      return listForRender.map(photo => <Tile imageSrc={photo.src} key={photo.id} />)
    }
  }

  const content = (friends)
    ? fieldComponents(friends)
    : (loadingPhotos ? <Preloader /> : fieldComponents(userPhotos))

  return (!friends && !userPhotos)
    ? (<Fragment>No content</Fragment>)
    : (
      <div className={classes.container}>
        <Typography className={classes.header} variant='subtitle1' component='div'>
          { friends
          ? <Fragment>Friends <span className={classes.count}>{friends.length}</span></Fragment>
          : <Fragment>Photos <span className={classes.count}>{userPhotos.length}</span></Fragment>
        }
        </Typography>
        <Grid className={classes.gridContainer} container spacing={1}>
          {content}
        </Grid>
      </div>
  )
}

ProfileField.propTypes = {
  friends: PropTypes.array,
  userPhotos: PropTypes.array,
  loadingPhotos: PropTypes.bool
}

export default ProfileField
