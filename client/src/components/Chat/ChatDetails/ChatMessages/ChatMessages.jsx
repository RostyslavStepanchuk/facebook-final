import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import ChatMessage from '../ChatMessage/ChatMessage'
import InfiniteScroll from '../../../InfiniteScroll/InfiniteScroll'

import useStyles from './chatMessagesStyles'

const MESSAGES_PAGE_SIZE = 12

const ChatMessages = ({
  authUser,
  messages,
  className,
  messagesLoading,
  loadContentHandler,
  ownMessageSent,
  isLastPageInChat
}) => {
  const classes = useStyles()
  const scrollToBottom = () => {
    ChatMessages.messagesEnd.scrollIntoView({ behavior: 'smooth' })
  }
  useEffect(() => {
    if (ownMessageSent) {
      scrollToBottom()
    }
  })

  return (
    <InfiniteScroll
      isReverseDirection
      contentIsLoading={messagesLoading}
      contentArrLength={messages.length}
      loadContentHandler={loadContentHandler}
      pageSize={MESSAGES_PAGE_SIZE}
      throttleDelay={1000}
      isLastPage={isLastPageInChat}
      scrollContainerStyles={{
        height: '80vh',
        overflowX: 'hidden',
        overflowY: 'scroll'
      }}
    >
      <div
        className={classnames(classes.root, className)}>
        <div className={classes.inner}>
          {messages.reverse()
            .map(message =>
              <ChatMessage
                key={message.id}
                message={message}
                authUser={authUser}
                />
            )}
        </div>
        <div style={{ float: 'left', clear: 'both' }}
          ref={(el) => { ChatMessages.messagesEnd = el }} />
      </div>
    </InfiniteScroll>
  )
}

ChatMessages.propTypes = {
  authUser: PropTypes.string.isRequired,
  className: PropTypes.string,
  messages: PropTypes.array.isRequired,
  messagesLoading: PropTypes.bool,
  loadContentHandler: PropTypes.func.isRequired,
  ownMessageSent: PropTypes.bool,
  isLastPageInChat: PropTypes.bool
}

export default ChatMessages
