import {
  START_LOADING_CHATS,
  STOP_LOADING_CHATS,
  CHATS_RECEIVED,
  START_LOADING_MESSAGES,
  MESSAGES_RECEIVED,
  STOP_LOADING_MESSAGES
} from '../utils/constants/actionsName'

const initialState = {
  chats: [],
  chatsLoading: false,
  chatMessages: [],
  messagesLoading: false
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case START_LOADING_CHATS:
      return { ...state, chatsLoading: true }

    case START_LOADING_MESSAGES:
      return { ...state, messagesLoading: true }

    case STOP_LOADING_CHATS:
      return { ...state, chatsLoading: false }

    case STOP_LOADING_MESSAGES:
      return { ...state, messagesLoading: false }

    case CHATS_RECEIVED:
      return { ...state, chats: payload, chatsLoading: false }

    case MESSAGES_RECEIVED:
      return { ...state, chatMessages: payload, messagesLoading: false }

    default:
      return {...state}
  }
}
