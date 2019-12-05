package com.socialmedia.controller;

import com.socialmedia.dto.security.UserCredentials;
import com.socialmedia.model.ApplicationUser;
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


  @Autowired
  public UserController(UserService userService) {

    this.userService = userService;
  }

  @GetMapping("/current")
  public ResponseEntity<ApplicationUser> getCurrentUser(Principal principal) {
    Optional<ApplicationUser> user = userService.getUser(principal.getName());
    return provideResponseForOptional(user);
  }

  @PostMapping("/sign-up")
  public ResponseEntity<ApplicationUser> signUp(@RequestBody UserCredentials user) {
    ApplicationUser userEntity = ApplicationUser.of(user);
    ApplicationUser savedUser = userService.addUser(userEntity);
    return ResponseEntity.ok(savedUser);
  }

}
