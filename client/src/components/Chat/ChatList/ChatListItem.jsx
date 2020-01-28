import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import {
  Typography,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar
} from '@material-ui/core'

import Preloader from '../../Preloader/Preloader'
import { getAvatarLink } from '../../../utils/helpers/imageLinkHelpers'
import { getDateForChat } from '../../../utils/date/getDate'
import { getFullName } from '../../../utils/helpers/formatters'

import useStyles from './ChatListItemStyles'

const ChatListItem = ({ active, chat, lastMessage, className, messagesLoading }) => {
  const classes = useStyles()
  const chatCaption = chat.participants.length > 2
  ? chat.name : getFullName(chat.participants[1])

  return messagesLoading ? <Preloader /> : (
    <ListItem
      button
      className={classnames(
        {
          [classes.active]: active
        },
        className
      )}
      component={Link}
      to={`/chat/${chat.id}`}
    >
      <ListItemAvatar>
        <Avatar
          alt='User'
          className={classes.avatar}
          src={getAvatarLink(chat.participants[1].avatar)}
        />
      </ListItemAvatar>
      <ListItemText
        primary={chatCaption}
        primaryTypographyProps={{
          noWrap: true,
          variant: 'h6'
        }}
        secondary={`${getFullName(lastMessage.author)}: ${lastMessage.text}`}
        secondaryTypographyProps={{
          noWrap: true,
          variant: 'body1'
        }}
      />
      <div className={classes.details}>
        <Typography
          noWrap
          variant='body2'
        >
          {getDateForChat(lastMessage.date)}
        </Typography>
      </div>
    </ListItem>
  )
}

ChatListItem.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  chat: PropTypes.object.isRequired,
  lastMessage: PropTypes.object
}

export default ChatListItem
