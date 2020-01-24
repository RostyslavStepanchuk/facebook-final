package com.socialmedia.repository;

import com.socialmedia.model.ChatMessage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

  Page<ChatMessage> getAllByChatId(Long chatId, Pageable pageable);
}
