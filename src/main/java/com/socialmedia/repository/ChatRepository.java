package com.socialmedia.repository;

import com.socialmedia.model.ApplicationUser;
import com.socialmedia.model.Chat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChatRepository extends JpaRepository<Chat, Long> {
    List<Chat> getAllByParticipantsContaining(ApplicationUser user);
}
