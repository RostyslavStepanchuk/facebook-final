import {
  CHAT_RECEIVED,
  CHATS_RECEIVED,
  CURRENT_CHAT_MESSAGE_RECEIVED,
  MESSAGES_RECEIVED,
  RESET_RECEIVED_MESSAGES,
  START_LOADING_CHAT,
  START_LOADING_CHATS,
  START_LOADING_MESSAGES,
  STOP_LOADING_CHAT,
  STOP_LOADING_CHATS,
  STOP_LOADING_MESSAGES
} from '../utils/constants/actionsName'
import { addPagedPayload } from '../utils/helpers/payloadAdapter'

const initialState = {
  chats: [],
  chatsLoading: false,
  chatMessages: [],
  messagesLoading: false,
  ownMessageSent: false,
  isLastPageInChat: false,
  chatLoading: false,
  chat: {}
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
      return { ...state,
        chatMessages: addPagedPayload(state.chatMessages, payload.content, 'id'),
        messagesLoading: false,
        ownMessageSent: false,
        isLastPageInChat: payload.last
      }

    case RESET_RECEIVED_MESSAGES:
      return {...state, chatMessages: []}

    case CURRENT_CHAT_MESSAGE_RECEIVED:
      return { ...state,
        chatMessages: [payload, ...state.chatMessages.reverse()],
        ownMessageSent: true,
      }

    case START_LOADING_CHAT:
      return { ...state, chatLoading: true }

    case STOP_LOADING_CHAT:
      return { ...state, chatLoading: false }

    case CHAT_RECEIVED:
      return { ...state, chat: payload, chatLoading: false }

    default:
      return {...state}
  }
}
