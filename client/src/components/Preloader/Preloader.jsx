import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import classNames from 'classnames'

import useStyles from './preloaderStyles'
import PropTypes from 'prop-types'

export default function Preloader ({ color = 'primary', fullScreen = false, size = 40 }) {
  const classes = useStyles({ fullScreen })

  return (
    <div className={classNames(classes.root, { fullScreen })}>
      <CircularProgress style={{ color: 'rgb(48, 213, 200)'}} size={size} />
    </div>
  )
}

Preloader.propTypes = {
  color: PropTypes.string,
  fullScreen: PropTypes.bool,
  size: PropTypes.string
}
