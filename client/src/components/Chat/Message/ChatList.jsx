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

const ChatList = props => {
  const { className, ...rest } = props
  const chats = [
    { id: 1, anotherParticipant: {name: 'Bill Clinton'}, text: 'Hi', date: 1580157471760},
    { id: 2, anotherParticipant: {name: 'Tyler Durden'}, text: 'Hello', date: 1575981606043},
    { id: 3, anotherParticipant: {name: 'Tony Stark'}, text: 'Bye', date: 1675481606043},
    { id: 4, anotherParticipant: {name: 'Taras Bas'}, text: 'Bis bald', date: 2575481606043}
  ]
  const classes = useStyles()
  const selectedChat = useParams().chatId

  return (
    <div
      {...rest}
      className={classnames(classes.root, className)}
    >
      <Toolbar>
        <Input
          className={classes.searchInput}
          disableUnderline
          placeholder='Search contacts'
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
            divider={i < chat.length - 1}
            key={chat.id}
          />
        ))}
      </List>
    </div>
  )
}

ChatList.propTypes = {
  className: PropTypes.string,
  conversations: PropTypes.array.isRequired
}

export default ChatList
