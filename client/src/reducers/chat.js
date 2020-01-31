import {
  START_LOADING_CHATS,
  STOP_LOADING_CHATS,
  CHATS_RECEIVED,
  START_LOADING_MESSAGES,
  MESSAGES_RECEIVED,
  STOP_LOADING_MESSAGES,
  SEND_MESSAGE
} from '../utils/constants/actionsName'

const initialState = {
  chats: [],
  chatsLoading: false,
  chatMessages: [],
  messagesLoading: false,
  keyForRender: 0
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

    case SEND_MESSAGE:
      /* eslint-disable */
      const newKey = ++state.keyForRender
      const newChatMessages = state.chatMessages
      newChatMessages.push(payload)
      /* eslint-enable */
      return { ...state, chatMessages: newChatMessages, keyForRender: newKey }

    default:
      return {...state}
  }
}
