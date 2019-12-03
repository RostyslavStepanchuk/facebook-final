package com.socialmedia.controller;

import com.socialmedia.model.ApplicationUser;
import com.socialmedia.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import java.util.Optional;

@RestController
@RequestMapping(value = "/api/v1/users")
public class UserController implements ResponseEntityProvider {

  private UserService userService;
  private BCryptPasswordEncoder bcryptPasswordEncoder;

  public UserController(UserService userService) {
    this.userService = userService;
  }


  @Autowired
  public UserController(UserService userService, BCryptPasswordEncoder bcryptPasswordEncoder) {
    this.userService = userService;
    this.bcryptPasswordEncoder = bcryptPasswordEncoder;
  }

  @GetMapping("/current")
  public ResponseEntity<ApplicationUser> getCurrentUser() {
    Optional<ApplicationUser> user = userService.getCurrentUser();
    return provideResponseForOptional(user);
  }

  @PostMapping("/sign-up")
  public ResponseEntity<ApplicationUser> signUp(@RequestBody ApplicationUser user) {
    user.setPassword(bcryptPasswordEncoder.encode(user.getPassword()));
    ApplicationUser savedUser = userService.signUp(user);
    return ResponseEntity.ok(savedUser);
  }

}
