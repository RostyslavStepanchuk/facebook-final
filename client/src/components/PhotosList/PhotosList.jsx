import React from 'react'
import { Typography, Grid } from '@material-ui/core'
import useStyles from './photosListStyles'
import PropTypes from 'prop-types'
import Tile from '../Tile/Tile'

const PhotosList = ({ userPhotos }) => {
  const classes = useStyles()

  const photoComponents = userPhotos => userPhotos.map(photo => <Tile imageSrc={photo.src} key={photo.id} />)

  return (
    <div className={classes.container}>
      <Typography className={classes.header} variant='subtitle1' component='div'>
        Photos <span className={classes.count}>{userPhotos.length}</span>
      </Typography>
      <Grid className={classes.gridContainer} container spacing={1}>
        {photoComponents(userPhotos)}
      </Grid>
    </div>
  )
}

PhotosList.propTypes = {
  userPhotos: PropTypes.array.isRequired
}

export default PhotosList
