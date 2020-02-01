import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import useStyles from './chatPlaceholderStyles'

const ChatPlaceholder = ({ className }) => {
  const classes = useStyles()

  return (
    <div className={classnames(className, classes.root)}> Please, select Chat </div>
  )
}

ChatPlaceholder.propTypes = {
  className: PropTypes.string
}

export default ChatPlaceholder
