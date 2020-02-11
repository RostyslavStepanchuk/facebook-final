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

import useStyles from './chatToolbarStyles'

const ChatToolbar = ({ chat, className, isSingleChat, isChatGrouped }) => {
  const classes = useStyles()
  // TODO: get active status from BE
  const isActive = false
  // const lastActivityTime

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
          { isActive ? (
            <Fragment>
              <StatusIcon
                className={classes.statusIcon}
                color='active'
              />
              <Typography variant='body2'>Active now</Typography>
            </Fragment>
          ) : (
            <Fragment>
              <StatusIcon
                className={classes.statusIcon}
                color='inActive'
              />
              <Typography variant='body2'>Active lastActivityTime ago</Typography>
            </Fragment>
          )}
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
  isSingleChat: PropTypes.bool
}

export default ChatToolbar
