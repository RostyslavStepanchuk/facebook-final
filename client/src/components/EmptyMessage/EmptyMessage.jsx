import React from 'react'
import { Paper, Typography } from '@material-ui/core'
import classnames from 'classnames'

import styleConstants from '../../utils/constants/styleConstants'
import useStyles from '../Chat/ChatPlaceholder/chatPlaceholderStyles'

export const EmptyMessages = ({ height, className, children }) => {
  const classes = useStyles({height})


  return (<Paper
    className={classnames(classes.root, className)}
    style={{
    height,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: styleConstants.CONTAINER_BG_COLOR,
    boxShadow: styleConstants.BTN_SHADOW
  }}>
    <Typography>{children}</Typography>
  </Paper>)
}
