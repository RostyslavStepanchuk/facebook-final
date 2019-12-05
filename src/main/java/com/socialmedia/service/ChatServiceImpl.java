package com.socialmedia.service;

import com.socialmedia.model.Chat;
import com.socialmedia.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatServiceImpl implements ChatService {

  private ChatRepository chatRepository;

  @Autowired
  public ChatServiceImpl(ChatRepository chatRepository) {
    this.chatRepository = chatRepository;
  }

  @Override
  public List<Chat> findAll() {
    return chatRepository.findAll();
  }
}
