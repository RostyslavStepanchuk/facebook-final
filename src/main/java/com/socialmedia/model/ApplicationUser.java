package com.socialmedia.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.socialmedia.dto.security.UserCredentials;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
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
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ApplicationUser {

  @Id
  @Column(name = "username")
  private String username;
  @ToString.Exclude
  @JsonIgnore
  @Column(name = "password")
  private String password;
  @MayAcceptNull
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
  @ToString.Exclude
  private List<ApplicationUser> friends;

  @OneToMany(mappedBy = "responder")
  @ToString.Exclude
  private List<FriendRequest> incomingFriendRequests;

  public static ApplicationUser of(UserCredentials credentials) {

    return ApplicationUser.builder()
        .username(credentials.getUsername())
        .password(credentials.getPassword())
        .build();
  }



}
