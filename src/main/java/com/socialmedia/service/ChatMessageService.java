package com.socialmedia.service;

import com.socialmedia.model.ApplicationUser;
import com.socialmedia.model.ChatMessage;
import com.socialmedia.repository.ChatMessageRepository;
import com.socialmedia.util.SmartCopyBeanUtilsBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ChatMessageService extends AbstractCrudService<ChatMessage, Long, ChatMessageRepository> {

  private UserService userService;

  @Autowired
  public ChatMessageService(ChatMessageRepository jpaRepository,
                            SmartCopyBeanUtilsBean beanUtilsBean, UserService userService) {
    super(jpaRepository, beanUtilsBean);
    this.userService = userService;
  }

  @Override
  public ChatMessage create(ChatMessage entity) {
    ChatMessage chatMessage = super.create(entity);
    Principal principal = SecurityContextHolder.getContext().getAuthentication();
    chatMessage.getChat().getParticipants()
        .forEach(user -> {
          if (!user.getUsername().equals(principal.getName())) {
            List<ChatMessage> unread = user.getUnreadMessages();
            unread.add(chatMessage);
            user.setUnreadMessages(unread);
            userService.update(user);
          }
        });
    return chatMessage;
  }

  public Page<ChatMessage> getAllMessagesForChat(Long chatId, Pageable pageable) {
    return jpaRepository.getAllByChatId(chatId, pageable);
  }

  public ChatMessage findLastForChatIdList(Long chatId) {
    Optional<ChatMessage> chatMessage = Optional.of(jpaRepository.findTopByChatIdOrderByDateDesc(chatId)
        .orElse(new ChatMessage()));
    return resolvedOptional(chatMessage, chatId);
  }

  public List<ChatMessage> getUnreadMessages() {
    Principal principal = SecurityContextHolder.getContext().getAuthentication();
    ApplicationUser user = userService.getById(principal.getName());
    return user.getUnreadMessages();
  }

  public Long removeReadMessages(Long chatId) {
    Principal principal = SecurityContextHolder.getContext().getAuthentication();
    ApplicationUser user = userService.getById(principal.getName());
    user.setUnreadMessages(user.getUnreadMessages()
        .stream()
        .filter(message -> message.getChat().getId() != chatId)
        .collect(Collectors.toList()));
    userService.update(user);
    return chatId;
  }
}
