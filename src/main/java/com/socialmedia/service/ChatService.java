package com.socialmedia.service;

import com.socialmedia.model.ApplicationUser;
import com.socialmedia.model.Chat;
import com.socialmedia.repository.ChatRepository;
import com.socialmedia.util.SmartCopyBeanUtilsBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public final class ChatService extends AbstractCrudService<Chat, Long, ChatRepository> {

  private UserService userService;

  @Autowired
  public ChatService(ChatRepository jpaRepository,
                     SmartCopyBeanUtilsBean beanUtilsBean,
                     @Lazy UserService userService) {
    super(jpaRepository, beanUtilsBean);
    this.userService = userService;
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

  public List<Chat> getAllChats() {
    Principal principal = SecurityContextHolder.getContext().getAuthentication();
    ApplicationUser user = userService.getById(principal.getName());

    return jpaRepository.getAllByParticipantsContaining(user);
  }

  public Chat getChatWithParticipant(String participantUsername) {
    Principal principal = SecurityContextHolder.getContext().getAuthentication();
    ApplicationUser user = userService.getById(principal.getName());
    ApplicationUser participant = userService.getById(participantUsername);

    List<Chat> chatsContainingParticipants = jpaRepository
            .getChatsByParticipantsContainingAndParticipantsContaining(user, participant);

    chatsContainingParticipants.stream().filter(chat -> chat.getParticipants().size() != 2)
            .findAny().ifPresent(chatsContainingParticipants::remove);

    if (chatsContainingParticipants.size() == 1) {
      return chatsContainingParticipants.get(0);
    } else {
      return null;
    }
  }

  public Chat createChat(Chat chat) {
    Principal principal = SecurityContextHolder.getContext().getAuthentication();
    ApplicationUser user = userService.getById(principal.getName());

    List<ApplicationUser> participants = chat.getParticipants().stream()
            .map(participant -> userService.getById(participant.getUsername())).collect(Collectors.toList());

    if (participants.size() == 1) {
      chat.setName(participants.get(0).getFirstName() + ' ' + participants.get(0).getLastName());
    }
    participants.add(user);
    chat.setParticipants(participants);

    return jpaRepository.save(chat);
  }

}
