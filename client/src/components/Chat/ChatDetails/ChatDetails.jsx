import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Divider } from '@material-ui/core'

import ChatToolbar from './ChatToolbar/ChatToolbar'
import ChatMessages from './ChatMessages/ChatMessages'
import SendMessage from './SendMessage/SendMessage'

import useStyles from './chatDetailsStyles'

const ChatDetails = ({ authUser, chat, messages, className }) => {
  const classes = useStyles()

  return (
    <div
      className={classnames(classes.root, className)}
    >
      <ChatToolbar chat={chat} />
      <Divider />
      <ChatMessages messages={messages} authUser={authUser} />
      <Divider />
      <SendMessage chatId={chat.id} />
    </div>
  )
}

ChatDetails.propTypes = {
  className: PropTypes.string,
  chat: PropTypes.object.isRequired,
  messages: PropTypes.array.isRequired,
  authUser: PropTypes.string.isRequired
}

export default ChatDetails
