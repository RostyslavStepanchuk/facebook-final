package com.socialmedia.controller;

import com.socialmedia.model.Chat;
import com.socialmedia.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/chats")
public class ChatController implements ResponseEntityProvider {

  private ChatService chatService;

  @Autowired
  public ChatController(ChatService chatService) {
    this.chatService = chatService;
  }

  //TODO remove endpoint, it's for testing purposes only
  @GetMapping
  public ResponseEntity<List<Chat>> getAll() {
    return provideResponseForList(chatService.findAll());
  }
}
