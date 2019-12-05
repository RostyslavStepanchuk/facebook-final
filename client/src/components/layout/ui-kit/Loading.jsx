import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import classNames from 'classnames'

import useStyles from './loadingStyles'

export default function Loading({ color = 'primary', fullScreen = false, size = '40px' }) {
  const classes = useStyles({ fullScreen })

  return (
    <div className={classNames(classes.root, { fullScreen })}>
      <CircularProgress color={color} size={size} />
    </div>
  )
}
