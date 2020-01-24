package com.socialmedia.mapper;

import com.socialmedia.dto.chat.message.ChatMessageDtoIn;
import com.socialmedia.dto.chat.message.ChatMessageDtoOut;
import com.socialmedia.model.ChatMessage;
import com.socialmedia.service.ChatMessageService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ChatMessageMapper
        extends AbstractControllerToCrudServiceMapper
        <ChatMessage, Long, ChatMessageDtoIn, ChatMessageDtoOut, ChatMessageService> {

  @Autowired
  public ChatMessageMapper(ModelMapper modelMapper, ChatMessageService crudService) {
    super(modelMapper, crudService);
  }

  @Override
  ChatMessageDtoOut responseDtoOf(ChatMessage entity) {
    return modelMapper.map(entity, ChatMessageDtoOut.class);
  }

  @Override
  ChatMessage entityOf(ChatMessageDtoIn dtoIn) {
    return modelMapper.map(dtoIn, ChatMessage.class);
  }

  public List<ChatMessageDtoOut> getAllMessagesForChat(Long chatId, Pageable pageable) {

    return crudService.getAllMessagesForChat(chatId, pageable)
            .stream()
            .map(this::responseDtoOf)
            .collect(Collectors.toList());
  }


}
