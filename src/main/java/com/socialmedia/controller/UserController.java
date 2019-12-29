package com.socialmedia.controller;

import com.socialmedia.dto.security.Token;
import com.socialmedia.dto.user.UserDtoIn;
import com.socialmedia.dto.user.UserDtoOut;
import com.socialmedia.dto.user.UserRegistrationDtoIn;
import com.socialmedia.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping(value = "/api/v1/users")
public class UserController {

  private UserMapper userMapper;

  @Autowired
  public UserController(UserMapper userMapper) {
    this.userMapper = userMapper;
  }

  @GetMapping("/current")
  public ResponseEntity<UserDtoOut> getCurrentUser(Principal principal) {

    return ResponseEntity.ok(userMapper.getById(principal.getName()));
  }

  @PostMapping
  public ResponseEntity<Token> signUp(@RequestBody UserRegistrationDtoIn userForm) {

    return ResponseEntity.ok(userMapper.signUp(userForm));
  }

  @GetMapping("/email/confirm/{emailConfirmationId}")
  ResponseEntity<Boolean> confirmEmail(@PathVariable String emailConfirmationId) {
    return ResponseEntity.ok(userMapper.confirmEmail(emailConfirmationId));
  }

  @PutMapping
  public ResponseEntity<UserDtoOut> updateUser(Principal principal,
                                               @RequestBody UserDtoIn user) {

    return ResponseEntity.ok(userMapper.update(principal.getName(), user));
  }

  @DeleteMapping
  public ResponseEntity<UserDtoOut> deleteUser(Principal principal) throws Exception {

    return ResponseEntity.ok(userMapper.delete(principal.getName()));
  }

}
