package com.socialmedia.controller.external.security;

import lombok.Data;
import lombok.Getter;

@Data
@Getter
public class UserCredentials {
  private String username;
  private String password;
}
