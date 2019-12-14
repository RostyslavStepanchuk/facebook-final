package com.socialmedia.controller;


import com.socialmedia.dto.security.Token;
import com.socialmedia.dto.security.UserCredentials;
import com.socialmedia.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/v1/auth")
public class AuthenticationController implements ResponseEntityProvider {

  private AuthenticationService authenticationService;

  @Autowired
  public AuthenticationController(AuthenticationService authenticationService) {

    this.authenticationService = authenticationService;
  }

  @PostMapping("/access-token")
  public ResponseEntity<Token> getAccessJwt(@RequestBody UserCredentials credentials) {

    Token token = new Token(authenticationService.getAccessToken(credentials));
    return ResponseEntity.ok(token);
  }

}
