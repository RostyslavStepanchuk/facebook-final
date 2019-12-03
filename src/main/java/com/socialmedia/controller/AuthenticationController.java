package com.socialmedia.controller;

import com.socialmedia.controller.external.security.UserCredentials;
import com.socialmedia.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/v1/auth")
public class AuthenticationController implements ResponseEntityProvider<String> {

  private AuthenticationService authenticationService;

  @Autowired
  public AuthenticationController(AuthenticationService authenticationService) {
    this.authenticationService = authenticationService;
  }

  @PostMapping("/access-token")
  public ResponseEntity<String> getAccessJWT(@RequestBody UserCredentials credentials) {
    return provideResponseForOptional(authenticationService.getAccessToken(credentials));
  }

}
