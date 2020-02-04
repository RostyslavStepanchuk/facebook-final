package com.socialmedia.mapper;

import com.socialmedia.dto.chat.message.ChatMessageDtoIn;
import com.socialmedia.dto.chat.message.ChatMessageDtoOut;
import com.socialmedia.model.ApplicationUser;
import com.socialmedia.model.Chat;
import com.socialmedia.model.ChatMessage;
import com.socialmedia.service.ChatMessageService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.security.Principal;

@Component
public class ChatMessageMapper
    extends AbstractControllerToCrudServiceMapper
    <ChatMessage, Long, ChatMessageDtoIn, ChatMessageDtoOut, ChatMessageService> {

  private ChatMapper chatMapper;
  private UserMapper userMapper;

  @Autowired
  public ChatMessageMapper(ModelMapper modelMapper, ChatMessageService crudService, UserMapper userMapper,
                           ChatMapper chatMapper) {
    super(modelMapper, crudService);
    this.userMapper = userMapper;
    this.chatMapper = chatMapper;
  }

  @Override
  ChatMessageDtoOut responseDtoOf(ChatMessage entity) {
    return modelMapper.map(entity, ChatMessageDtoOut.class);
  }

  @Override
  ChatMessage entityOf(ChatMessageDtoIn dtoIn) {
    ChatMessage chatMessage = modelMapper.map(dtoIn, ChatMessage.class);
    Principal principal = SecurityContextHolder.getContext().getAuthentication();
    ApplicationUser author = userMapper.entityOf(principal.getName());
    Chat chat = chatMapper.entityOf(dtoIn.getChatId());
    chatMessage.setAuthor(author);
    chatMessage.setChat(chat);
    chatMessage.setDate(System.currentTimeMillis());
    return chatMessage;
  }

  public Page<ChatMessageDtoOut> getAllMessagesForChat(Long chatId, Pageable pageable) {

    return crudService.getAllMessagesForChat(chatId, pageable).map(this::responseDtoOf);
  }


}
