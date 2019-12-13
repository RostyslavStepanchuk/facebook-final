package com.socialmedia.service;

import com.socialmedia.model.Chat;
import com.socialmedia.repository.ChatRepository;
import com.socialmedia.util.SmartCopyBeanUtilsBean;
import org.springframework.stereotype.Service;

@Service
public final class ChatService extends AbstractCrudService<Chat, Long, ChatRepository> {

  public ChatService(ChatRepository jpaRepository, SmartCopyBeanUtilsBean beanUtilsBean) {
    super(jpaRepository, beanUtilsBean);
  }
}
