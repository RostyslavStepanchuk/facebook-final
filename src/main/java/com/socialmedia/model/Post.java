package com.socialmedia.model;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.List;

@Data
@Entity
@Table(name = "posts")
public class Post {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  private Long id;
  @Column(name = "message")
  private String message;
  @Column(name = "date")
  private Long date;
  @Column(name = "image")
  private String image;
  @Column(name = "show_everyone")
  private Boolean showEveryone;

  @ManyToOne
  @JoinColumn(name = "fk_author_username")
  private ApplicationUser author;

  @OneToMany(mappedBy = "id")
  private List<Comment> receivedComments;

  @JoinTable(name = "likes",
      joinColumns = @JoinColumn(name = "fk_post_id"),
      inverseJoinColumns = @JoinColumn(name = "fk_provider_username"))
  @OneToMany
  private List<ApplicationUser> likes;
}
