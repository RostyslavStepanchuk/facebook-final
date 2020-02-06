import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import { getChat } from '../../actions/chat'
import Chat from '../Chat/Chat'
import Preloader from '../../components/Preloader/Preloader'

const MessagesList = ({userId, getChat, chat}) => {
  useEffect(() => {
    getChat(userId)
  }, [userId])

  return isEmpty(chat) ? <Preloader /> : <Chat chatIdProps={chat.id} withoutSidepanel containerHeight={42} />
}

MessagesList.propTypes = {
  userId: PropTypes.string,
  getChat: PropTypes.func.isRequired,
  chat: PropTypes.object
}

const mapStateToProps = state => ({
  chat: state.chat.chat,
  chatLoading: state.chat.chatLoading
})

export default connect(mapStateToProps, { getChat })(MessagesList)
