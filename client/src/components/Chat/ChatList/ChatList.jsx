import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
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

const ChatList = ({ className, chats, chatsLoading }) => {
  const classes = useStyles()
  const selectedChat = +useParams().chatId

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
      <List disablePadding>
        {chats.map((chat, i) => (
          <ChatListItem
            active={chat.id === selectedChat}
            chat={chat}
            divider={i < chats.length - 1}
            key={chat.id}
            messagesLoading={chatsLoading}
          />
        ))}
      </List>
    </div>
  )
}

ChatList.propTypes = {
  className: PropTypes.string,
  chats: PropTypes.array.isRequired,
  chatsLoading: PropTypes.bool
}

export default ChatList
