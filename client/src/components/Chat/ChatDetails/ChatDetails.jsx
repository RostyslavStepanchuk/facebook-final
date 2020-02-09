import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Divider } from '@material-ui/core'
import ChatToolbar from './ChatToolbar/ChatToolbar'
import ChatMessages from './ChatMessages/ChatMessages'
import SendMessage from './SendMessage/SendMessage'

import useStyles from './chatDetailsStyles'
import classnames from 'classnames'

import { clearCurrentChatMessages, sendChatBeenReadNotification } from '../../../actions/chat'
import { useLocation } from 'react-router-dom'

const ChatDetails = ({
  authUser,
  chat,
  messages,
  className,
  messagesLoading,
  loadContentHandler,
  ownMessageSent,
  isLastPageInChat,
  containerHeight,
  clearCurrentChatMessages,
  sendChatBeenReadNotification
}) => {
  const classes = useStyles()

  const currentPath = useLocation().pathname
  useEffect(() => {
    clearCurrentChatMessages()
  }, [ currentPath, clearCurrentChatMessages ])

  useEffect(() => {
    sendChatBeenReadNotification(chat.id)
  }, [chat.id, sendChatBeenReadNotification])

  return (
    <div
      className={classnames(classes.root, className)}
    >
      <ChatToolbar chat={chat} />
      <Divider />
      <ChatMessages
        messages={messages}
        authUser={authUser}
        messagesLoading={messagesLoading}
        loadContentHandler={loadContentHandler}
        ownMessageSent={ownMessageSent}
        isLastPageInChat={isLastPageInChat}
        containerHeight={containerHeight}
      />
      <Divider />
      <SendMessage chatId={chat.id} />
    </div>
  )
}

ChatDetails.propTypes = {
  className: PropTypes.string,
  chat: PropTypes.object.isRequired,
  messages: PropTypes.array.isRequired,
  authUser: PropTypes.string.isRequired,
  messagesLoading: PropTypes.bool,
  loadContentHandler: PropTypes.func.isRequired,
  ownMessageSent: PropTypes.bool,
  isLastPageInChat: PropTypes.bool,
  containerHeight: PropTypes.number,
  clearCurrentChatMessages: PropTypes.func.isRequired,
  sendChatBeenReadNotification: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  clearCurrentChatMessages: () => dispatch(clearCurrentChatMessages()),
  sendChatBeenReadNotification: chatId => dispatch(sendChatBeenReadNotification(chatId))
})
export default connect(null, mapDispatchToProps)(ChatDetails)
