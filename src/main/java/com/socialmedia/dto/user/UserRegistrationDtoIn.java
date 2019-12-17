package com.socialmedia.dto.user;

import lombok.Data;

@Data
public class UserRegistrationDtoIn {

  private String username;
  private String password;
  private String email;
  private String firstName;
  private String lastName;
}
