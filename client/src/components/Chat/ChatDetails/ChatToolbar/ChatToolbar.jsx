import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  IconButton,
  Input,
  Paper,
  Toolbar,
  Tooltip,
  Typography
} from '@material-ui/core'
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace'
import SearchIcon from '@material-ui/icons/Search'

import StatusIcon from '../../../StatusIcon/StatusIcon'
import { getActiveTime } from '../../../../utils/date/getDate'

import useStyles from './chatToolbarStyles'
import Preloader from '../../../Preloader/Preloader'

const ChatToolbar = ({
  chat,
  className,
  isSingleChat,
  isChatGrouped,
  isActive,
  lastActivityTime,
  activeFriendsAreLoading
}) => {
  const classes = useStyles()
  const ActiveStatus = isActive ? (
    <Fragment>
      <StatusIcon
        className={classes.statusIcon}
        color='active'
      />
      <Typography variant='body2'>{getActiveTime(lastActivityTime)}</Typography>
    </Fragment>
  ) : (
    <Fragment>
      <StatusIcon
        className={classes.statusIcon}
        color='inActive'
      />
      <Typography variant='body2'>Not Active</Typography>
    </Fragment>
  )

  return (
    <Toolbar
      className={classnames(classes.root, className)}
    >
      {isSingleChat && <Tooltip title='To chat'>
        <IconButton
          className={classes.backButton}
          component={Link}
          edge='start'
          to={`/chat/${chat.id}`}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>}
      <div className={classes.user}>
        <Typography variant='h6'>{chat.name}</Typography>
        { !isChatGrouped && <div className={classes.activity}>
          {activeFriendsAreLoading ? <Preloader size={10} /> : ActiveStatus}
        </div>}
      </div>
      <Paper className={classes.search}>
        <SearchIcon className={classes.searchIcon} />
        <Input
          className={classes.searchInput}
          disableUnderline
          placeholder='Search message'
        />
      </Paper>
    </Toolbar>
  )
}

ChatToolbar.propTypes = {
  className: PropTypes.string,
  chat: PropTypes.object.isRequired,
  withoutSidepanel: PropTypes.bool,
  isChatGrouped: PropTypes.bool.isRequired,
  isSingleChat: PropTypes.bool,
  isActive: PropTypes.bool.isRequired,
  activeFriendsAreLoading: PropTypes.bool.isRequired,
  lastActivityTime: PropTypes.number
}

export default ChatToolbar
