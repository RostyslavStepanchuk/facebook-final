import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import classNames from 'classnames'

import useStyles from './preloaderStyles'
import PropTypes from 'prop-types'

export default function Preloader({ color = 'primary', fullScreen = false, size = '40px' }) {
  const classes = useStyles({ fullScreen })

  return (
    <div className={classNames(classes.root, { fullScreen })}>
      <CircularProgress color={color} size={size} />
    </div>
  )
}

Preloader.propTypes = {
  color: PropTypes.string,
  fullScreen: PropTypes.bool,
  size: PropTypes.string
}
