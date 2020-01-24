package com.socialmedia.service;

import com.socialmedia.model.ChatMessage;
import com.socialmedia.repository.ChatMessageRepository;
import com.socialmedia.util.SmartCopyBeanUtilsBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ChatMessageService extends AbstractCrudService<ChatMessage, Long, ChatMessageRepository> {

  @Autowired
  public ChatMessageService(ChatMessageRepository jpaRepository,
                              SmartCopyBeanUtilsBean beanUtilsBean) {
    super(jpaRepository, beanUtilsBean);
  }

  public Page<ChatMessage> getAllMessagesForChat(Long chatId, Pageable pageable) {
    return jpaRepository.getAllByChatId(chatId, pageable);
  }
}
