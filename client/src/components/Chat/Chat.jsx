import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import ChatList from './ChatList/ChatList'
import ChatDetails from './ChatDetails/ChatDetails'
import ChatPlaceholder from './ChatPlaceholder/ChatPlaceholder'
import { getAllChats, getMessagesForChat } from '../../actions/chat'

import useStyles from './chatStyles'

const FIRST_PAGE = 0
const PAGE_SIZE = 12

const Chat = ({
  chatIdProps,
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
  isLastPageInChat,
  propsForRerender
}) => {
  const classes = useStyles()
  let selectedChat, selectedChatId, loadContentHandler
  const chatIdParams = +useParams().chatId
  const chatId = chatIdProps || chatIdParams

  if (!isEmpty(chats)) {
    selectedChat = chatId
      ? chats.find(chat => chat.id === chatId)
      : chats[0]
    selectedChatId = selectedChat.id
    loadContentHandler = getMessagesForChat.bind(null, selectedChatId)
  }
  useEffect(() => {
    if (!isEmpty(chats)) {
      getMessagesForChat(selectedChatId, FIRST_PAGE, PAGE_SIZE, true)
    }
  }, [getMessagesForChat, selectedChatId])

  useEffect(() => {
    getAllChats()
  }, [getAllChats, propsForRerender])

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
        />
      ) : (
        <ChatPlaceholder className={classes.chatPlaceholder} />
      )}
    </div>
  )
}

Chat.propTypes = {
  chatIdProps: PropTypes.number,
  withoutSidepanel: PropTypes.bool,
  containerHeight: PropTypes.number,
  authUser: PropTypes.string.isRequired,
  chats: PropTypes.array,
  getAllChats: PropTypes.func.isRequired,
  chatMessages: PropTypes.array,
  getMessagesForChat: PropTypes.func.isRequired,
  messagesLoading: PropTypes.bool,
  ownMessageSent: PropTypes.bool,
  chatsLoading: PropTypes.bool,
  isLastPageInChat: PropTypes.bool,
  propsForRerender: PropTypes.bool
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

export default connect(mapStateToProps, { getAllChats, getMessagesForChat })(Chat)
