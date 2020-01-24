package com.socialmedia.controller;

import com.socialmedia.dto.chat.ChatDtoIn;
import com.socialmedia.dto.chat.ChatDtoOut;
import com.socialmedia.mapper.ChatMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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

  @GetMapping
  public ResponseEntity<List<ChatDtoOut>> getAllChats() {
    return ResponseEntity.ok(chatMapper.getAllChats());
  }

  @GetMapping("/{participantUsername}")
  public ResponseEntity<ChatDtoOut> getChatWithParticipant(@PathVariable String participantUsername) {
    return ResponseEntity.ok(chatMapper.getChatWithParticipant(participantUsername));
  }

  @PostMapping("/{participantUsername}")
  public ResponseEntity<ChatDtoOut> createChat(@PathVariable String participantUsername) {
    return ResponseEntity.ok(chatMapper.createChat(participantUsername));
  }
}
