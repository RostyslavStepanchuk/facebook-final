import {
  START_LOADING_CHATS,
  STOP_LOADING_CHATS,
  CHATS_RECEIVED,
  START_LOADING_MESSAGES,
  MESSAGES_RECEIVED,
  STOP_LOADING_MESSAGES,
  SEND_MESSAGE,
  RESET_RECEIVED_MESSAGES
} from '../utils/constants/actionsName'
import { addPagedPayload } from '../utils/helpers/payloadAdapter'

const initialState = {
  chats: [],
  chatsLoading: false,
  chatMessages: [],
  messagesLoading: false,
  ownMessageSent: false,
  isLastPageInChat: false
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

    case SEND_MESSAGE:
      return { ...state,
        chatMessages: [payload, ...state.chatMessages.reverse()],
        ownMessageSent: true
      }

    default:
      return {...state}
  }
}
