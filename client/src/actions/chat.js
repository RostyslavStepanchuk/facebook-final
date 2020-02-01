import {
  START_LOADING_CHATS,
  STOP_LOADING_CHATS,
  CHATS_RECEIVED,
  START_LOADING_MESSAGES,
  MESSAGES_RECEIVED,
  STOP_LOADING_MESSAGES,
  SEND_MESSAGE
} from '../utils/constants/actionsName'
import apiRequest from '../utils/helpers/apiRequest'

export const getAllChats = () => async dispatch => {
  dispatch({
    type: START_LOADING_CHATS
  })

  apiRequest.get('/chats', null, true)
    .then(res => {
      dispatch({
        type: CHATS_RECEIVED,
        payload: res
      })
    }
    )
    .catch(() => dispatch({
      type: STOP_LOADING_CHATS
    }))
}

export const getMessagesForChat = chatId => async dispatch => {
  dispatch({
    type: START_LOADING_MESSAGES
  })

  apiRequest.get(`/messages/${chatId}`, null, true)
    .then(res => {
      dispatch({
        type: MESSAGES_RECEIVED,
        payload: res
      })
    }
    )
    .catch(() => dispatch({
      type: STOP_LOADING_MESSAGES
    }))
}

export const sendMessage = ({ chatId, text }) => async dispatch => {
  apiRequest.post('/messages/add', {chatId, text})
    .then(res => {
      dispatch({
        type: SEND_MESSAGE,
        payload: res
      })
    }
    )
}
