package com.socialmedia.controller;


import com.socialmedia.dto.security.Token;
import com.socialmedia.dto.security.UserCredentials;
import com.socialmedia.mapper.AuthenticationMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/v1/auth")
public class AuthenticationController {

  private AuthenticationMapper authenticationMapper;

  @Autowired
  public AuthenticationController(AuthenticationMapper authenticationMapper) {
    this.authenticationMapper = authenticationMapper;
  }

  @PostMapping("/access-token")
  public ResponseEntity<Token> getAccessJwt(@RequestBody UserCredentials credentials) {

    Token token = authenticationMapper.getAccessToken(credentials);
    return ResponseEntity.ok(token);
  }

}
