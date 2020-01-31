import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'

import ChatList from './ChatList/ChatList'
import ChatDetails from './ChatDetails/ChatDetails'
import ChatPlaceholder from './ChatPlaceholder/ChatPlaceholder'
import { getAllChats, getMessagesForChat } from '../../actions/chat'

import useStyles from './chatStyles'

const Chat = ({ authUser, chats, getAllChats, chatMessages, getMessagesForChat, messagesLoading, keyForRender }) => {
  const classes = useStyles()
  const selectedChatId = +useParams().chatId

  useEffect(() => {
    getAllChats()
    getMessagesForChat(selectedChatId)
  }, [getAllChats, getMessagesForChat, selectedChatId])

  let selectedChat

  if (selectedChatId) {
    selectedChat = chats.find(
      chat => chat.id === selectedChatId
    )
  }

  return (
    <div
      className={classes.root}
    >
      <ChatList
        className={classes.chatList}
        chats={chats}
        chatMessages={chatMessages.reverse()}
        messagesLoading={messagesLoading}
      />
      {selectedChat ? (
        <ChatDetails
          authUser={authUser}
          className={classes.chatDetails}
          chat={selectedChat}
          messages={chatMessages}
        />
      ) : (
        <ChatPlaceholder className={classes.chatPlaceholder} />
      )}
    </div>
  )
}

Chat.propTypes = {
  authUser: PropTypes.string.isRequired,
  chats: PropTypes.array,
  getAllChats: PropTypes.func.isRequired,
  chatMessages: PropTypes.array,
  getMessagesForChat: PropTypes.func.isRequired,
  messagesLoading: PropTypes.bool,
  keyForRender: PropTypes.number
}

const mapStateToProps = state => ({
  authUser: state.auth.user.username,
  chats: state.chat.chats,
  chatMessages: state.chat.chatMessages,
  messagesLoading: state.chat.messagesLoading,
  keyForRender: state.chat.keyForRender
})

export default connect(mapStateToProps, { getAllChats, getMessagesForChat })(Chat)
