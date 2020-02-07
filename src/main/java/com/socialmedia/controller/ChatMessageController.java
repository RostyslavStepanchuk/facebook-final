package com.socialmedia.controller;

import com.socialmedia.dto.chat.message.ChatMessageDtoIn;
import com.socialmedia.dto.chat.message.ChatMessageDtoOut;
import com.socialmedia.mapper.ChatMessageMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/messages")
public class ChatMessageController {

  private ChatMessageMapper chatMessageMapper;
  private SimpMessagingTemplate messagingTemplate;

  @Autowired
  public ChatMessageController(ChatMessageMapper chatMessageMapper, SimpMessagingTemplate messagingTemplate) {
    this.chatMessageMapper = chatMessageMapper;
    this.messagingTemplate = messagingTemplate;
  }

  @GetMapping("/{chatId}")
  public ResponseEntity<Page<ChatMessageDtoOut>> getAllMessagesForChat(
            @PathVariable Long chatId,
            @PageableDefault(sort = { "id" }, direction = Sort.Direction.DESC) Pageable pageable) {
    return ResponseEntity.ok(chatMessageMapper.getAllMessagesForChat(chatId, pageable));
  }

  @PostMapping("/add/{chatId}")
  public ResponseEntity<ChatMessageDtoOut> sendMessage(@PathVariable Long chatId, @RequestBody ChatMessageDtoIn message) {
    ChatMessageDtoOut chatMessage = chatMessageMapper.create(message);
    messagingTemplate.convertAndSend(String.format("/topic/chats/%d", chatId), chatMessage);
    return ResponseEntity.ok(chatMessageMapper.create(message));
  }

}