import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import classnames from 'classnames'
import { Divider } from '@material-ui/core'

import ChatToolbar from './ChatToolbar/ChatToolbar'
import ChatMessages from './ChatMessages/ChatMessages'
import SendMessage from './SendMessage/SendMessage'
import { clearCurrentChatMessages, sendChatBeenReadNotification } from '../../../actions/chat'

import useStyles from './chatDetailsStyles'

const ChatDetails = ({
  authUser,
  chat,
  messages,
  className,
  messagesLoading,
  loadContentHandler,
  ownMessageSent,
  isLastPageInChat,
  clearCurrentChatMessages,
  sendChatBeenReadNotification,
  withoutSidepanel,
  containerHeight = 'FULL'
}) => {
  const classes = useStyles()

  const currentPath = useLocation().pathname
  const isChatGrouped = chat.participants.length > 2

  useEffect(() => {
    clearCurrentChatMessages()
  }, [ currentPath, clearCurrentChatMessages ])

  useEffect(() => {
    sendChatBeenReadNotification(chat.id)
  }, [chat.id, sendChatBeenReadNotification])

  return (
    <div
      className={classnames(classes.root, className,
        {
          [classes.fullHeight]: containerHeight === 'FULL',
          [classes.halfHeight]: containerHeight === 'HALF'
        })}
    >
      <ChatToolbar
        chat={chat}
        withoutSidepanel={withoutSidepanel}
        isChatGrouped={isChatGrouped}
      />
      <Divider />
      <ChatMessages
        messages={messages}
        authUser={authUser}
        messagesLoading={messagesLoading}
        loadContentHandler={loadContentHandler}
        ownMessageSent={ownMessageSent}
        isLastPageInChat={isLastPageInChat}
        isChatGrouped={isChatGrouped}
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
  containerHeight: PropTypes.string,
  withoutSidepanel: PropTypes.bool,
  clearCurrentChatMessages: PropTypes.func.isRequired,
  sendChatBeenReadNotification: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  clearCurrentChatMessages: () => dispatch(clearCurrentChatMessages()),
  sendChatBeenReadNotification: chatId => dispatch(sendChatBeenReadNotification(chatId))
})
export default connect(null, mapDispatchToProps)(ChatDetails)
