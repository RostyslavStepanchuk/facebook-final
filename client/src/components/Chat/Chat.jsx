import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'

import ChatList from './ChatList/ChatList'
import ChatDetails from './ChatDetails/ChatDetails'
import ChatPlaceholder from './ChatPlaceholder/ChatPlaceholder'
import { getAllChats, getMessagesForChat } from '../../actions/chat'

import useStyles from './chatStyles'

const Chat = ({ authUser,
  chats,
  getAllChats,
  chatMessages,
  getMessagesForChat,
  messagesLoading,
  ownMessageSend,
  chatsLoading}) => {
  const classes = useStyles()
  const selectedChatId = +useParams().chatId
  const loadContentHandler = getMessagesForChat.bind(null, selectedChatId)

  useEffect(() => {
    getMessagesForChat(selectedChatId, 0, 7, true)
  }, [getMessagesForChat, selectedChatId])

  useEffect(() => {
    getAllChats()
  }, [getAllChats])

  let selectedChat

  if (selectedChatId) {
    selectedChat = chats.find(
      chat => chat.id === selectedChatId
    )
  }

  return (
    <div className={classes.root}>
      <ChatList
        className={classes.chatList}
        chats={chats}
        chatMessages={chatMessages}
        chatsLoading={chatsLoading}
      />
      {selectedChat ? (
        <ChatDetails
          authUser={authUser}
          className={classes.chatDetails}
          chat={selectedChat}
          messages={chatMessages}
          messagesLoading={messagesLoading}
          loadContentHandler={loadContentHandler}
          ownMessageSend={ownMessageSend}
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
  ownMessageSend: PropTypes.bool,
  chatsLoading: PropTypes.bool
}

const mapStateToProps = state => ({
  authUser: state.auth.user.username,
  chats: state.chat.chats,
  chatsLoading: state.chat.chatsLoading,
  chatMessages: state.chat.chatMessages,
  messagesLoading: state.chat.messagesLoading,
  ownMessageSend: state.chat.ownMessageSend
})

export default connect(mapStateToProps, { getAllChats, getMessagesForChat })(Chat)
