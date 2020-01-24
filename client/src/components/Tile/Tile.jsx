import React, { Fragment } from 'react'
import { Grid } from '@material-ui/core'
import useStyles from './tileStyles'
import PropTypes from 'prop-types'

const Tile = ({ imageSrc, title }) => {
  const classes = useStyles({image: imageSrc})

  const content = (imageSrc, title) => {
    return <Grid item xs={4}>
      <div className={classes.image} />
      { title &&
        <p className={classes.title}>{title}</p>
      }
    </Grid>
  }

  return (
    <Fragment>
      {content(imageSrc, title)}
    </Fragment>
  )
}

Tile.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  title: PropTypes.string
}

export default Tile
