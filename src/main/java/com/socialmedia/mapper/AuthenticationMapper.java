package com.socialmedia.mapper;

import com.socialmedia.dto.security.Token;
import com.socialmedia.dto.security.UserCredentials;
import com.socialmedia.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationMapper {

  private AuthenticationService authenticationService;

  @Autowired
  public AuthenticationMapper(AuthenticationService authenticationService) {
    this.authenticationService = authenticationService;
  }

  public Token getAccessToken(UserCredentials credentials) {

    return authenticationService.getAccessToken(credentials);
  }
}
