package com.socialmedia.mapper;

import com.socialmedia.dto.chat.ChatDtoIn;
import com.socialmedia.dto.chat.ChatDtoOut;
import com.socialmedia.model.Chat;
import com.socialmedia.service.ChatService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

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

  public List<ChatDtoOut> getChats() {

    return crudService.getChats()
            .stream()
            .map(this::responseDtoOf)
            .collect(Collectors.toList());
  }

}
