import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { isEmpty, isFinite } from 'lodash'

import ChatList from './ChatList/ChatList'
import ChatDetails from './ChatDetails/ChatDetails'
import ChatPlaceholder from './ChatPlaceholder/ChatPlaceholder'
import { getAllChats, getMessagesForChat } from '../../actions/chat'

import useStyles from './chatStyles'

const FIRST_PAGE = 0
const PAGE_SIZE = 12

const Chat = ({
  chat,
  withoutSidepanel,
  containerHeight,
  authUser,
  chats,
  getAllChats,
  chatMessages,
  getMessagesForChat,
  messagesLoading,
  ownMessageSent,
  chatsLoading,
  isLastPageInChat
}) => {
  const classes = useStyles()
  const chatIdParams = +useParams().chatId
  let selectedChat, selectedChatId, loadContentHandler

  useEffect(() => {
    getAllChats()
  }, [getAllChats])

  if (!isEmpty(chat)) {
    selectedChat = chat
    selectedChatId = chat.id
    loadContentHandler = getMessagesForChat.bind(null, selectedChatId)
  } else if (!isEmpty(chats)) {
    selectedChat = isFinite(chatIdParams)
      ? chats.find(chat => chat.id === chatIdParams)
      : chats[0]
    selectedChatId = selectedChat.id
    loadContentHandler = getMessagesForChat.bind(null, selectedChatId)
  }

  useEffect(() => {
    if (selectedChatId) {
      getMessagesForChat(selectedChatId, FIRST_PAGE, PAGE_SIZE, true)
    }
  }, [getMessagesForChat, selectedChatId])

  return (
    <div className={classes.root}>
      {!withoutSidepanel && <ChatList
        className={classes.chatList}
        chats={chats}
        chatMessages={chatMessages}
        chatsLoading={chatsLoading}
        selectedChatId={selectedChatId}
      />}
      {selectedChat ? (
        <ChatDetails
          authUser={authUser}
          className={classes.chatDetails}
          chat={selectedChat}
          messages={chatMessages}
          messagesLoading={messagesLoading}
          loadContentHandler={loadContentHandler}
          ownMessageSent={ownMessageSent}
          isLastPageInChat={isLastPageInChat}
          containerHeight={containerHeight}
          withoutSidepanel={withoutSidepanel}
        />
      ) : (
        <ChatPlaceholder className={classes.chatPlaceholder} />
      )}
    </div>
  )
}

Chat.propTypes = {
  chat: PropTypes.object,
  withoutSidepanel: PropTypes.bool,
  containerHeight: PropTypes.string,
  authUser: PropTypes.string.isRequired,
  chats: PropTypes.array,
  getAllChats: PropTypes.func.isRequired,
  chatMessages: PropTypes.array,
  getMessagesForChat: PropTypes.func.isRequired,
  messagesLoading: PropTypes.bool,
  ownMessageSent: PropTypes.bool,
  chatsLoading: PropTypes.bool,
  isLastPageInChat: PropTypes.bool
}

const mapStateToProps = state => ({
  authUser: state.auth.user.username,
  chats: state.chat.chats,
  chatsLoading: state.chat.chatsLoading,
  chatMessages: state.chat.chatMessages,
  messagesLoading: state.chat.messagesLoading,
  ownMessageSent: state.chat.ownMessageSent,
  isLastPageInChat: state.chat.isLastPageInChat
})

export default connect(mapStateToProps, { getAllChats, getMessagesForChat })(Chat)
