import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SockJsClient from 'react-stomp'

import { Divider } from '@material-ui/core'
import ChatToolbar from './ChatToolbar/ChatToolbar'
import ChatMessages from './ChatMessages/ChatMessages'
import SendMessage from './SendMessage/SendMessage'

import useStyles from './chatDetailsStyles'
import classnames from 'classnames'

import { receiveMessage } from '../../../actions/chat'
import apiRequest from '../../../utils/helpers/apiRequest'

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
  receiveMessage
}) => {
  const classes = useStyles()

  const onMessageReceive = msg => {
    receiveMessage(msg)
  }

  return (
    <div
      className={classnames(classes.root, className)}
    >
      <SockJsClient url={apiRequest.getSocketUrl()} topics={[`/topic/chats/${chat.id}`]}
                    onMessage={onMessageReceive}
                    ref={ client => { ChatDetails.clientRef = client }} />
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
  containerHeight: PropTypes.number
}

export default connect(null, { receiveMessage })(ChatDetails)
