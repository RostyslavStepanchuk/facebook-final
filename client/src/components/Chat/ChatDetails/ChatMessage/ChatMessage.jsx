import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { get } from 'lodash'
import { Typography, Link, Avatar } from '@material-ui/core'

import { getFullName } from '../../../../utils/helpers/formatters'
import { getAvatarLink } from '../../../../utils/helpers/imageLinkHelpers'
import { getDateForChat } from '../../../../utils/date/getDate'

import useStyles from './chatMessageStyles'

const ChatMessage = ({ message, authUser, isChatGrouped }) => {
  const classes = useStyles()
  const messageAuthorUsername = get(message, 'author.username')
  const isOwnMessage = authUser === messageAuthorUsername

  return (
    <div
      className={classnames(
        classes.root,
        {
          [classes.ownMessage]: isOwnMessage
        }
      )}
    >
      <div className={classes.inner}>
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={getAvatarLink(message.author)}
          to={`/profile/${messageAuthorUsername}`}
        />
        <div>
          <div className={classes.body}>
            <div>
              <Link
                color='inherit'
                component={RouterLink}
                to={`/profile/${messageAuthorUsername}`}
                variant='body2'
              >
                {isOwnMessage || !isChatGrouped ? '' : getFullName(message.author)}
              </Link>
            </div>
            <div className={classes.content}>
              <Typography
                color='inherit'
                variant='body1'
                >
                {message.text}
              </Typography>
            </div>
          </div>
          <div className={classes.footer}>
            <Typography
              variant='body2'
            >
              {getDateForChat(message.date)}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  )
}

ChatMessage.propTypes = {
  authUser: PropTypes.string.isRequired,
  message: PropTypes.object.isRequired,
  isChatGrouped: PropTypes.bool.isRequired
}

export default ChatMessage
