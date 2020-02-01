import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import useStyles from './photosListStyles'
import PropTypes from 'prop-types'
import Tile from '../Tile/Tile'
import { get } from 'lodash'

const PhotosList = ({ userPhotos }) => {
  const classes = useStyles()

  const photoComponents = userPhotos => userPhotos.map(photo => <Tile imageSrc={get(photo, 'src')}
    key={get(photo, 'id', '')} />)

  return (
    <div className={classes.container}>
      <Typography className={classes.header} variant='subtitle1' component='div'>
        Photos <span className={classes.count}>{get(userPhotos, 'length', '—')}</span>
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
