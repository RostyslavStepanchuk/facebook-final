package com.socialmedia.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "users")
public class User {

  @Id
  private String username;
  @ToString.Exclude
  @JsonIgnore
  private String password;
  private String email;
  @Column(name = "first_name")
  private String firstName;
  @Column(name = "last_name")
  private String lastName;
  @Column(name = "birth_date")
  private Long birthDate;
  private String avatar;
  @Column(name = "refresh_token")
  private String refreshToken;
  @Column(name = "forgot_password_tkn")
  private String forgotPasswordToken;
  @Column(name = "open_account")
  private Boolean openAccount;

}
