package com.socialmedia.controller;

import com.socialmedia.dto.chat.ChatDtoOut;
import com.socialmedia.mapper.ChatMapper;
import com.socialmedia.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/chats")
public class ChatController implements ResponseEntityProvider {

  private ChatService chatService;
  private ChatMapper chatMapper;

  @Autowired
  public ChatController(ChatService chatService, ChatMapper chatMapper) {
    this.chatService = chatService;
    this.chatMapper = chatMapper;
  }

  //TODO remove endpoint, it's for test purposes only
  @GetMapping
  public ResponseEntity<List<ChatDtoOut>> getAll() {
    List<ChatDtoOut> chats = chatService.findAll().stream()
        .map(chatMapper::toDto)
        .collect(Collectors.toList());
    return provideResponseForList(chats);
  }
}
