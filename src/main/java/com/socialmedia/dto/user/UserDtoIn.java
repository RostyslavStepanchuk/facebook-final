package com.socialmedia.dto.user;

import lombok.Data;

@Data
public class UserDtoIn {

  private String username;
  private String email;
  private String firstName;
  private String lastName;
  private String birthDate;
  private String avatar;
  private Boolean openAccount;
}
