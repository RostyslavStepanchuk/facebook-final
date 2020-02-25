import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { find, get } from 'lodash'
import { Avatar, Badge, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core'

import Preloader from '../../Preloader/Preloader'
import { getAvatarLink } from '../../../utils/helpers/imageLinkHelpers'
import { getDateForChat } from '../../../utils/date/getDate'
import { getFullName } from '../../../utils/helpers/formatters'

import useStyles from './ChatListItemStyles'

const ChatListItem = ({ active, chat, className, chatsLoading, authUser, unreadMessagesCount }) => {
  const { participants, lastMessage, name, id } = chat
  const classes = useStyles()
  const isChatGrouped = participants.length > 2
  const secondParticipant = find(participants, participant => participant.username !== authUser)
  const thirdParticipant = find(participants, participant =>
    participant.username !== authUser && participant.username !== secondParticipant.username)
  const chatName = isChatGrouped ? name : getFullName(secondParticipant)

  return chatsLoading ? <Preloader /> : (
    <ListItem
      button
      className={classnames(
        {
          [classes.active]: active
        },
        className
      )}
      component={Link}
      to={`/chat/${id}`}
    >
      {isChatGrouped ? (<ListItemAvatar>
        <Fragment>
          <Avatar
            alt='User'
            className={classes.avatarSmall}
            src={getAvatarLink(secondParticipant)}
          />
          <Avatar
            alt='User'
            className={classes.avatarSmall}
            src={getAvatarLink(thirdParticipant)}
        />
        </Fragment>
      </ListItemAvatar>) : (<ListItemAvatar>
        <Avatar
          alt='User'
          className={classes.avatar}
          src={getAvatarLink(secondParticipant)}
        />
      </ListItemAvatar>)}

      <ListItemText
        primary={chatName}
        primaryTypographyProps={{
          noWrap: true,
          variant: 'h6'
        }}
        secondary={get(lastMessage, 'author', false)
          ? `${getFullName(lastMessage.author)}: ${lastMessage.text}`
          : 'No messages yet'}
        secondaryTypographyProps={{
          noWrap: true,
          variant: 'body1'
        }}
      />

      <div className={classes.details}>
        <Badge invisible={!unreadMessagesCount} color='secondary' badgeContent={unreadMessagesCount} />
        <Typography
          noWrap
          variant='body2'
        >
          {get(lastMessage, 'date', false) && getDateForChat(lastMessage.date)}
        </Typography>

      </div>
    </ListItem>
  )
}

ChatListItem.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  chat: PropTypes.object.isRequired,
  chatsLoading: PropTypes.bool,
  authUser: PropTypes.string.isRequired,
  unreadMessagesCount: PropTypes.number
}

export default ChatListItem
