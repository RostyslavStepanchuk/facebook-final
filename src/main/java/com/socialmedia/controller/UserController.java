package com.socialmedia.controller;

import com.socialmedia.dto.security.Token;
import com.socialmedia.dto.security.UserCredentials;
import com.socialmedia.dto.user.UserDtoIn;
import com.socialmedia.dto.user.UserDtoOut;
import com.socialmedia.mapper.UserMapper;
import com.socialmedia.model.ApplicationUser;
import com.socialmedia.service.AuthenticationService;
import com.socialmedia.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.InvocationTargetException;
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

  @PostMapping
  public ResponseEntity<Token> signUp(@RequestBody UserCredentials user) {

    userService.addUser(userMapper.toEntity(user));

    Token token = authenticationService.getAccessToken(user)
        .map(Token::new)
        .orElseThrow(() -> new RuntimeException("Unable to get access token for newly created user"));
    return ResponseEntity.ok(token);
  }

  @PutMapping("/{username}")
  public ResponseEntity<UserDtoOut> updateUser(Principal principal,
                                               @PathVariable String username,
                                               @RequestBody UserDtoIn user)
      throws InvocationTargetException, IllegalAccessException {

    if (!principal.getName().equals(username)) {
      throw new BadCredentialsException(String.format("User %s can't be updated from this account", username));
    }

    Optional<ApplicationUser> applicationUser = userService.updateUser(username, userMapper.toEntity(user));

    return provideResponseForOptional(applicationUser.map(userMapper::toFullDto));
  }

  @DeleteMapping("/{username}")
  public ResponseEntity<UserDtoOut> deleteUser(@PathVariable String username, Principal principal) {

    if (!principal.getName().equals(username)) {
      throw new BadCredentialsException(String.format("User %s can't be deleted from this account", username));
    }
    Optional<ApplicationUser> deletedUser = userService.delete(username);
    return provideResponseForOptional(deletedUser.map(userMapper::toFullDto));
  }

}
