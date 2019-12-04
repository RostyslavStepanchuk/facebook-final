package com.socialmedia.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "messages")
public class ChatMessage {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;

  @Column(name = "text")
  private String text;

  @Column(name = "date")
  private Long date;

  @ManyToOne
  @JoinColumn(name = "fk_author_username")
  private ApplicationUser author;

  @ManyToOne
  @JoinColumn(name = "fk_chat_id")
  @JsonBackReference
  private Chat chat;

}
