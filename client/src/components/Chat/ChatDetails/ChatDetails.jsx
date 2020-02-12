import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useLocation } from 'react-router-dom'
import classnames from 'classnames'
import { Divider } from '@material-ui/core'
import { get, find } from 'lodash'

import ChatToolbar from './ChatToolbar/ChatToolbar'
import ChatMessages from './ChatMessages/ChatMessages'
import SendMessage from './SendMessage/SendMessage'
import { clearCurrentChatMessages, sendChatBeenReadNotification } from '../../../actions/chat'

import useStyles from './chatDetailsStyles'
import { loadActiveFriends } from '../../../actions/friends'

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
  isSingleChat,
  containerHeight = 'FULL',
  activeFriends,
  activeFriendsAreLoading,
  loadActiveFriends
}) => {
  const classes = useStyles()

  const currentPath = useLocation().pathname
  const isChatGrouped = chat.participants.length > 2

  useEffect(() => {
    clearCurrentChatMessages()
  }, [ currentPath, clearCurrentChatMessages ])

  useEffect(() => {
    sendChatBeenReadNotification(chat.id)
    loadActiveFriends(0, 100, true)
  }, [chat.id, sendChatBeenReadNotification, loadActiveFriends])

  const activeParticipant = find(activeFriends, {username: chat.participants[1].username})
  const lastActivityTime = get(activeParticipant, 'lastActivityTime')

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
        isSingleChat={isSingleChat}
        isChatGrouped={isChatGrouped}
        isActive={!!activeParticipant}
        lastActivityTime={lastActivityTime}
        activeFriendsAreLoading={activeFriendsAreLoading}
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
  isSingleChat: PropTypes.bool,
  clearCurrentChatMessages: PropTypes.func.isRequired,
  sendChatBeenReadNotification: PropTypes.func.isRequired,
  activeFriends: PropTypes.array.isRequired,
  activeFriendsAreLoading: PropTypes.bool.isRequired,
  loadActiveFriends: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
  activeFriends: state.friends.activeFriends,
  activeFriendsAreLoading: state.friends.loadingActiveFriends
})

const mapDispatchToProps = dispatch => ({
  clearCurrentChatMessages: () => dispatch(clearCurrentChatMessages()),
  sendChatBeenReadNotification: chatId => dispatch(sendChatBeenReadNotification(chatId)),
  loadActiveFriends: (page, size, isInitial) => dispatch(loadActiveFriends(page, size, isInitial))
})
export default connect(mapStateToProps, mapDispatchToProps)(ChatDetails)
