import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'

import ChatList from './ChatList/ChatList'
import { getAllChats, getMessagesForChat } from '../../actions/chat'

import useStyles from './ChatStyles'

const Chat = ({ chats, getAllChats, chatMessages, getMessagesForChat, messagesLoading }) => {
  const classes = useStyles()
  const selectedChatId = useParams().chatId

  useEffect(() => {
    getAllChats()
    getMessagesForChat(selectedChatId)
  }, [getAllChats, getMessagesForChat, selectedChatId])

  return (
    <div
      className={classes.root}
    >
      <ChatList
        className={classes.chatList}
        chats={chats}
        chatMessages={chatMessages}
        messagesLoading={messagesLoading}
      />
    </div>
  )
}

Chat.propTypes = {
  chats: PropTypes.array,
  getAllChats: PropTypes.func.isRequired,
  chatMessages: PropTypes.array,
  getMessagesForChat: PropTypes.func.isRequired,
  messagesLoading: PropTypes.bool
}

const mapStateToProps = state => ({
  chats: state.chat.chats,
  chatMessages: state.chat.chatMessages,
  messagesLoading: state.chat.messagesLoading
})

export default connect(mapStateToProps, { getAllChats, getMessagesForChat })(Chat)
