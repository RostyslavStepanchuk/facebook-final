import {
  START_LOADING_CHATS,
  STOP_LOADING_CHATS,
  CHATS_RECEIVED,
  START_LOADING_MESSAGES,
  MESSAGES_RECEIVED,
  STOP_LOADING_MESSAGES,
  SEND_MESSAGE,
  RESET_RECEIVED_MESSAGES,
  START_LOADING_CHAT,
  STOP_LOADING_CHAT,
  CHAT_RECEIVED
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

export const getMessagesForChat = (chatId, page, size, isInitialRequest) => async dispatch => {
  dispatch({
    type: START_LOADING_MESSAGES
  })

  if (isInitialRequest) {
    dispatch({
      type: RESET_RECEIVED_MESSAGES
    })
  }

  apiRequest.get(`/messages/${chatId}`, { params: { page, size } })
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
  apiRequest.post(`/messages/add/${chatId}`, {chatId, text})
    .then(res => {
      dispatch({
        type: SEND_MESSAGE,
        payload: res
      })
    }
    )
}

export const getChat = userId => async dispatch => {
  dispatch({
    type: START_LOADING_CHAT
  })
  apiRequest.get(`/chats/${userId}`, null, true)
    .then(res => {
      dispatch({
        type: CHAT_RECEIVED,
        payload: res
      })
    }
    )
    .catch(() => dispatch({
      type: STOP_LOADING_CHAT
    }))
}
