package com.socialmedia.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.socialmedia.dto.security.UserCredentials;
import lombok.Data;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.List;

@Data
@Entity
@Table(name = "users")
public class ApplicationUser {

  @Id
  @Column(name = "username")
  private String username;
  @ToString.Exclude
  @Column(name = "password")
  private String password;
  @Column(name = "email")
  private String email;
  @Column(name = "first_name")
  private String firstName;
  @Column(name = "last_name")
  private String lastName;
  @Column(name = "birth_date")
  private Long birthDate;
  @Column(name = "avatar")
  private String avatar;
  @Column(name = "refresh_token")
  private String refreshToken;
  @Column(name = "forgot_password_tkn")
  private String forgotPasswordToken;
  @Column(name = "open_account")
  private Boolean openAccount;

  @ManyToMany(fetch = FetchType.EAGER)
  @JoinTable(name = "friends",
      joinColumns = @JoinColumn(name = "fk_username"),
      inverseJoinColumns = @JoinColumn(name = "fk_friend_username"))
  @JsonBackReference // TODO remove BackReference, implement DTO
  private List<ApplicationUser> friends;

  @OneToMany(mappedBy = "responder")
  private List<FriendRequest> incomingFriendRequests;

  public static ApplicationUser of(UserCredentials credentials) {
    ApplicationUser user = new ApplicationUser();
    user.setUsername(credentials.getUsername());
    user.setPassword(credentials.getPassword());
    return user;
  }



}
