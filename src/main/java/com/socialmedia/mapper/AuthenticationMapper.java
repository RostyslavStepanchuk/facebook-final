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

  public Token getAccessTokenByRefreshToken(String refreshToken, String username) {

    return authenticationService.getAccessTokenByRefreshToken(refreshToken, username);
  }

  public String generateRefreshToken(String username) {

    return authenticationService.generateRefreshToken(username);
  }

  public void logOut(String username) {
    authenticationService.logOut(username);
  }
}
