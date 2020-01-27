import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import {
  Typography,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar
} from '@material-ui/core'
import { getAvatarLink } from '../../../utils/helpers/imageLinkHelpers'
import { getDateForChat } from '../../../utils/date/getDate'

import useStyles from './ChatListItemStyles'

const ChatListItem = props => {
  const { active, chat, className, ...rest } = props

  const classes = useStyles()
  // const lastMessage = chat.messages[conversation.messages.length - 1]

  return (
    <ListItem
      {...rest}
      button
      className={classnames(
        {
          [classes.active]: active
        },
        className
      )}
      component={RouterLink}
      // to={`/chat/${conversation.id}`}
    >
      <ListItemAvatar>
        <Avatar
          alt='Person'
          className={classes.avatar}
          src={getAvatarLink(chat)}
        />
      </ListItemAvatar>
      <ListItemText
        primary={chat.anotherParticipant.name}
        primaryTypographyProps={{
          noWrap: true,
          variant: 'h6'
        }}
        secondary={`lastMessage.senderName: lastMessage.text`}
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
          {getDateForChat(chat.date)}
        </Typography>
      </div>
    </ListItem>
  )
}

ChatListItem.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  conversation: PropTypes.object.isRequired
}

export default ChatListItem
