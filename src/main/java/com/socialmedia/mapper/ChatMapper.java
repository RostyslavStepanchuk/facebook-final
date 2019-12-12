package com.socialmedia.mapper;

import com.socialmedia.dto.chat.ChatDtoIn;
import com.socialmedia.dto.chat.ChatDtoOut;
import com.socialmedia.model.Chat;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ChatMapper {

  private ModelMapper modelMapper;

  @Autowired
  public ChatMapper(ModelMapper modelMapper) {
    this.modelMapper = modelMapper;
  }

  public ChatDtoOut toDto(Chat chat) {
    return modelMapper.map(chat, ChatDtoOut.class);
  }

  public Chat toEntity(ChatDtoIn chatDtoIn){
    return modelMapper.map(chatDtoIn, Chat.class);
  }

}
