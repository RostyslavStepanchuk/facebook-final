import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import {
  Toolbar,
  Input,
  IconButton,
  Tooltip,
  Divider,
  List
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

import ChatListItem from './ChatListItem'

import useStyles from './ChatListStyles'

const ChatList = ({ className, chats, chatsLoading, selectedChatId, authUser }) => {
  const classes = useStyles()

  return (
    <div
      className={classnames(classes.root, className)}
    >
      <Toolbar>
        <Input
          className={classes.searchInput}
          disableUnderline
          placeholder='Search'
        />
        <Tooltip title='Search'>
          <IconButton edge='end'>
            <SearchIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>
      <Divider />
      <List disablePadding className={classes.chatListContainer}>
        {chats.map((chat, i) => (
          <ChatListItem
            active={chat.id === selectedChatId}
            chat={chat}
            divider={i < chats.length - 1}
            key={chat.id}
            messagesLoading={chatsLoading}
            authUser={authUser}
          />
        ))}
      </List>
    </div>
  )
}

ChatList.propTypes = {
  className: PropTypes.string,
  chats: PropTypes.array.isRequired,
  chatsLoading: PropTypes.bool,
  selectedChatId: PropTypes.number,
  authUser: PropTypes.string.isRequired
}

export default ChatList
