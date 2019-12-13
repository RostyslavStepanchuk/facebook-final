package com.socialmedia.controller;

import com.socialmedia.dto.chat.ChatDtoOut;
import com.socialmedia.mapper.ChatMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/chats")
public class ChatController {

  private ChatMapper chatMapper;

  @Autowired
  public ChatController(ChatMapper chatMapper) {
    this.chatMapper = chatMapper;
  }

  //TODO remove endpoint, it's for test purposes only
  @GetMapping
  public ResponseEntity<List<ChatDtoOut>> getAll() {

    return ResponseEntity.ok(chatMapper.getAll());
  }
}
