import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import ChatMessage from '../ChatMessage/ChatMessage'
import InfiniteScroll from '../../../InfiniteScroll/InfiniteScroll'

import useStyles from './chatMessagesStyles'

const ChatMessages = ({ authUser, messages, className, messagesLoading, loadContentHandler, ownMessageSend }) => {
  const classes = useStyles()
  let isInitialScroll = useRef(true)
  const scrollToBottom = () => {
    ChatMessages.messagesEnd.scrollIntoView({ behavior: 'smooth' })
  }
  useEffect(() => {
    if (isInitialScroll.current || ownMessageSend) {
      scrollToBottom()
    } else {
      setTimeout(() => { ChatMessages.messagesStart.scrollIntoView({ behavior: 'smooth' }) }, 500)
    }
    setTimeout(() => { isInitialScroll.current = false }, 500)
  })

  return (
    <InfiniteScroll
      isReverseDirection
      contentIsLoading={messagesLoading}
      contentArr={messages}
      loadContentHandler={loadContentHandler}
      size={7}
      throttleDelay={1000}
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
            .map((message, index) => {
              return index === 1 ? (
                <div
                  ref={(el) => { ChatMessages.messagesStart = el }}
                  key={message.id}>
                  <ChatMessage
                    message={message}
                    authUser={authUser}
                  />
                </div>) : (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    authUser={authUser}
                />
              )
            })}
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
  ownMessageSend: PropTypes.bool
}

export default ChatMessages
