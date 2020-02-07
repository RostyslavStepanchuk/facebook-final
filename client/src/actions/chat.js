import {
  CHATS_RECEIVED,
  MESSAGES_RECEIVED,
  RESET_RECEIVED_MESSAGES,
  SEND_MESSAGE,
  START_LOADING_CHATS,
  START_LOADING_MESSAGES,
  STOP_LOADING_CHATS,
  STOP_LOADING_MESSAGES
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
