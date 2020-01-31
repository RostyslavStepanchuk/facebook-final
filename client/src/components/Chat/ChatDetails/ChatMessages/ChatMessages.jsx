import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import ChatMessage from '../ChatMessage/ChatMessage'

import useStyles from './chatMessagesStyles'

const ChatMessages = ({ authUser, messages, className }) => {
  const classes = useStyles()

  return (
    <div className={classnames(classes.root, className)}>
      <div className={classes.inner}>
        {messages.map(message => {
          return (
            <ChatMessage
              key={message.id}
              message={message}
              authUser={authUser}
              />
          )
        })}
      </div>
    </div>
  )
}

ChatMessages.propTypes = {
  authUser: PropTypes.string.isRequired,
  className: PropTypes.string,
  messages: PropTypes.array.isRequired
}

export default ChatMessages
