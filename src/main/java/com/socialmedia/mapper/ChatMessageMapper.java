package com.socialmedia.mapper;

import com.socialmedia.dto.chat.message.ChatMessageDtoIn;
import com.socialmedia.dto.chat.message.ChatMessageDtoOut;
import com.socialmedia.model.ChatMessage;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ChatMessageMapper {

  private ModelMapper modelMapper;

  @Autowired
  public ChatMessageMapper(ModelMapper modelMapper) {
    this.modelMapper = modelMapper;
  }

  public ChatMessageDtoOut toDto(ChatMessage entity) {
    return modelMapper.map(entity, ChatMessageDtoOut.class);
  }

  public ChatMessage toEntity(ChatMessageDtoIn chatMessageDtoIn){
    return modelMapper.map(chatMessageDtoIn, ChatMessage.class);
  }
}
