package com.socialmedia.mapper;

import com.socialmedia.dto.chat.ChatDtoIn;
import com.socialmedia.dto.chat.ChatDtoOut;
import com.socialmedia.model.Chat;
import com.socialmedia.service.ChatService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public final class ChatMapper extends AbstractControllerToCrudServiceMapper<Chat,Long, ChatDtoIn, ChatDtoOut, ChatService> {

  @Autowired
  public ChatMapper(ModelMapper modelMapper, ChatService crudService) {
    super(modelMapper, crudService);
  }

  @Override
  ChatDtoOut responseDtoOf(Chat entity) {
    return modelMapper.map(entity, ChatDtoOut.class);
  }

  @Override
  Chat entityOf(ChatDtoIn dtoIn) {
    return modelMapper.map(dtoIn, Chat.class);
  }

  public ChatDtoOut toDto(Chat chat) {
    return modelMapper.map(chat, ChatDtoOut.class);
  }

  public Chat toEntity(ChatDtoIn chatDtoIn) {
    return modelMapper.map(chatDtoIn, Chat.class);
  }

}
