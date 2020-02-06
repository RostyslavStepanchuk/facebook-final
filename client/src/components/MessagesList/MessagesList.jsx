import React, { Fragment } from 'react'
import { connect } from 'react-redux'

const MessagesList = () => {
  return (
    <Fragment>
      MessagesList
    </Fragment>
  )
}

const mapStateToProps = state => ({
  authUser: state.auth.user.username,
  chats: state.chat.chats,
  chatsLoading: state.chat.chatsLoading,
  chatMessages: state.chat.chatMessages,
  messagesLoading: state.chat.messagesLoading,
  ownMessageSent: state.chat.ownMessageSent,
  isLastPageInChat: state.chat.isLastPageInChat,
  propsForRerender: state.chat.propsForRerender
})

export default connect(mapStateToProps, {}) (MessagesList)
