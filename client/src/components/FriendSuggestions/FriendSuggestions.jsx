import React from 'react'
import PropTypes from 'prop-types'

import { Paper, Typography } from '@material-ui/core'
import FriendSuggestionItem from './FriendSuggestionItem/FriendSuggestionItem'

import useStyles from './friendSuggestionsStyles'

const FriendSuggestions = ({ suggestions }) => {
  const classes = useStyles()

  const content = suggestions.map(s => <FriendSuggestionItem person={s.user} commonFriends={s.commonFriends} key={s.user.username} />)

  return (
    <Paper elevation={1} className={classes.paper}>
      <Typography variant='subtitle1' component='div' className={classes.header}>
        People you may know
      </Typography>
      {content}
    </Paper>
  )
}

FriendSuggestions.propTypes = {
  suggestions: PropTypes.arrayOf(PropTypes.shape({
    user: PropTypes.shape({
      username: PropTypes.string.isRequired
    }).isRequired,
    commonFriends: PropTypes.array.isRequired
  })).isRequired
}

export default FriendSuggestions
