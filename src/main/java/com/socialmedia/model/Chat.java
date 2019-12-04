package com.socialmedia.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.List;

@Data
@Entity
@Table(name = "chats")
public class Chat {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @Column(name = "name")
  private String name;

  @ManyToMany
  @JoinTable(name = "chat_to_user",
      joinColumns = @JoinColumn(name = "fk_chat_id"),
      inverseJoinColumns = @JoinColumn(name = "fk_participant_username"))
  private List<ApplicationUser> participants;

  @OneToMany(mappedBy = "chat")
  private List<ChatMessage> messages;
}