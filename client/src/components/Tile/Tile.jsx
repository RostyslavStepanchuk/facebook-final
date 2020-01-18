import React, { Fragment } from 'react'
import { Grid } from '@material-ui/core'
import useStyles from './tileStyles'
import PropTypes from 'prop-types'

const Tile = ({ imageSrc, title }) => {
  const classes = useStyles()

  const content = (imageSrc, title) => {
    return <Grid item xs={4}>
      <div className={classes.gridItem}>
        <img src={imageSrc} className={classes.image} alt='UserImage'/>
        { title &&
          <p className={classes.title}>{title}</p>
        }
      </div>
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
  title: PropTypes.string,
}

export default Tile

