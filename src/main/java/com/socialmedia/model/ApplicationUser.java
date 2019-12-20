package com.socialmedia.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.util.List;


@Data
@Entity
@Table(name = "users")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ApplicationUser implements DbEntity<String> {

  @Id
  @Column(name = "username")
  private String username;
  @ToString.Exclude
  @JsonIgnore
  @Column(name = "password")
  private String password;
  @Column(name = "email")
  private String email;
  @MayAcceptNull
  @Column(name = "first_name")
  private String firstName;
  @MayAcceptNull
  @Column(name = "last_name")
  private String lastName;
  @MayAcceptNull
  @Column(name = "birth_date")
  private Long birthDate;
  @Column(name = "avatar")
  private String avatar;
  @Column(name = "open_account")
  private Boolean openAccount;

  @OneToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "fk_tokens_data_id")
  @JsonBackReference
  private TokensData tokensData;

  @ManyToMany
  @JoinTable(name = "friends",
      joinColumns = @JoinColumn(name = "fk_username"),
      inverseJoinColumns = @JoinColumn(name = "fk_friend_username"))
  @ToString.Exclude
  private List<ApplicationUser> friends;

  @OneToMany(mappedBy = "responder")
  @ToString.Exclude
  private List<FriendRequest> incomingFriendRequests;

  @ManyToMany(mappedBy = "participants")
  @JsonBackReference
  private List<Chat> chats;

  @ManyToMany(mappedBy = "likes")
  @JsonBackReference
  private List<Post> likedPosts;

  @OneToMany(mappedBy = "author", cascade = CascadeType.REMOVE)
  @JsonBackReference
  private List<Comment> writtenComments;

  @OneToMany(mappedBy = "author", cascade = CascadeType.REMOVE)
  @JsonBackReference
  private List<ChatMessage> writtenMessages;

  @Override
  public String getId() {
    return username;
  }
}
