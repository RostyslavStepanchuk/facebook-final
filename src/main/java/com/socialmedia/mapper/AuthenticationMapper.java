package com.socialmedia.mapper;

import com.socialmedia.dto.security.Token;
import com.socialmedia.dto.security.UserCredentials;
import com.socialmedia.model.ApplicationUser;
import com.socialmedia.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletResponse;

@Component
public class AuthenticationMapper {

  private AuthenticationService authenticationService;
  private UserMapper userMapper;

  @Autowired
  public AuthenticationMapper(AuthenticationService authenticationService, UserMapper userMapper) {
    this.authenticationService = authenticationService;
    this.userMapper = userMapper;
  }

  public Token getAccessToken(UserCredentials credentials) {

    return authenticationService.getAccessToken(credentials);
  }

  public Token refreshTokens(String refreshToken, String username, HttpServletResponse resp) {
    ApplicationUser applicationUser = userMapper.entityOf(username);
    return authenticationService.refreshTokens(refreshToken, applicationUser, resp);
  }
}
