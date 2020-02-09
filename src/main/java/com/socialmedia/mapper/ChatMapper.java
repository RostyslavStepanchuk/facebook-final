package com.socialmedia.mapper;

import com.socialmedia.dto.chat.ChatDtoIn;
import com.socialmedia.dto.chat.ChatDtoOut;
import com.socialmedia.dto.chat.ChatDtoOutWithLastMessage;
import com.socialmedia.dto.chat.message.ChatMessageDtoOut;
import com.socialmedia.model.Chat;
import com.socialmedia.model.ChatMessage;
import com.socialmedia.service.ChatMessageService;
import com.socialmedia.service.ChatService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public final class ChatMapper
    extends AbstractControllerToCrudServiceMapper<Chat, Long, ChatDtoIn, ChatDtoOut, ChatService> {

  private ChatMessageService chatMessageService;

  @Autowired
  public ChatMapper(ModelMapper modelMapper, ChatService crudService,
                    ChatMessageService chatMessageService) {
    super(modelMapper, crudService);
    this.chatMessageService = chatMessageService;
  }

  @Override
  ChatDtoOut responseDtoOf(Chat entity) {
    return modelMapper.map(entity, ChatDtoOut.class);
  }

  @Override
  Chat entityOf(ChatDtoIn dtoIn) {
    return modelMapper.map(dtoIn, Chat.class);
  }

  public Chat entityOf(Long chatId) {
    return crudService.getById(chatId);
  }

  public List<ChatDtoOutWithLastMessage> getAllChatsWithPrincipal() {
    return crudService.getAllChatsWithPrincipal()
        .stream()
        .map(chat -> modelMapper.map(chat, ChatDtoOutWithLastMessage.class))
        .peek(chatDto -> {
          ChatMessage lastChatMessage = chatMessageService.findLastForChatIdList(chatDto.getId());
          chatDto.setLastMessage(modelMapper.map(lastChatMessage, ChatMessageDtoOut.class));
        })
        .collect(Collectors.toList());
  }

  public ChatDtoOut getChatWithParticipant(String participantUsername) {
    return responseDtoOf(crudService.getChatWithParticipant(participantUsername));
  }

  public ChatDtoOut createChat(String participantUsername) {
    return responseDtoOf(crudService.createChat(participantUsername));
  }


}
