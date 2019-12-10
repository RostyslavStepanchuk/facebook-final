package com.socialmedia.controller;

import com.socialmedia.dto.security.Token;
import com.socialmedia.dto.security.UserCredentials;
import com.socialmedia.dto.user.UserDtoOut;
import com.socialmedia.mapper.UserMapper;
import com.socialmedia.model.ApplicationUser;
import com.socialmedia.service.AuthenticationService;
import com.socialmedia.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.Optional;

@RestController
@RequestMapping(value = "/api/v1/users")
public class UserController implements ResponseEntityProvider {

  private UserService userService;
  private AuthenticationService authenticationService;
  private UserMapper userMapper;


  @Autowired
  public UserController(UserService userService, AuthenticationService authenticationService, UserMapper userMapper) {

    this.userService = userService;
    this.authenticationService = authenticationService;
    this.userMapper = userMapper;
  }

  @GetMapping("/current")
  public ResponseEntity<UserDtoOut> getCurrentUser(Principal principal) {

    Optional<ApplicationUser> user = userService.getUser(principal.getName());
    return provideResponseForOptional(user.map(userMapper::toFullDto));
  }

  @PostMapping("/sign-up")
  public ResponseEntity<Token> signUp(@RequestBody UserCredentials user) {

    userService.addUser(userMapper.toEntity(user));

    Token token = authenticationService.getAccessToken(user)
        .map(Token::new)
        .orElseThrow(() -> new RuntimeException("Unable to get access token for newly created user"));
    return ResponseEntity.ok(token);
  }

}
