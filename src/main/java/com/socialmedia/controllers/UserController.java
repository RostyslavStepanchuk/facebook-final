package com.socialmedia.controllers;

import com.socialmedia.models.User;
import com.socialmedia.services.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping(value = "/api/v1/users")
public class UserController implements ResponseEntityProvider<User> {

  private UserService userService;

  @Autowired
  public UserController(UserService userService) {
    this.userService = userService;
  }

  @GetMapping("/current")
  public ResponseEntity<User> getCurrentUser() {
    Optional<User> user = userService.getCurrentUser();
    return provideResponseForOptional(user);
  }

}
