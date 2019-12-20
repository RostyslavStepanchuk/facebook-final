package com.socialmedia.service;

import com.socialmedia.model.ApplicationUser;
import com.socialmedia.model.Chat;
import com.socialmedia.repository.ChatRepository;
import com.socialmedia.util.SmartCopyBeanUtilsBean;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public final class ChatService extends AbstractCrudService<Chat, Long, ChatRepository> {

  public ChatService(ChatRepository jpaRepository, SmartCopyBeanUtilsBean beanUtilsBean) {
    super(jpaRepository, beanUtilsBean);
  }

  public Chat removeParticipant(Long chatId, String participantUsername) {
    Chat chat = getById(chatId);
    return removeParticipant(chat, participantUsername);
  }

  public Chat removeParticipant(Chat chat, String participantUsername) {
    List<ApplicationUser> filteredParticipantsList = chat.getParticipants().stream()
        .filter(p -> !p.getUsername().equals(participantUsername))
        .collect(Collectors.toList());
    chat.setParticipants(filteredParticipantsList);
    return jpaRepository.save(chat);
  }
}
