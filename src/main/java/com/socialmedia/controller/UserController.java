package com.socialmedia.controller;

import com.socialmedia.dto.security.Token;
import com.socialmedia.dto.user.FriendSuggestionDtoOut;
import com.socialmedia.dto.user.UserDtoIn;
import com.socialmedia.dto.user.UserDtoOut;
import com.socialmedia.dto.user.UserLabelDtoOut;
import com.socialmedia.dto.user.UserRegistrationDtoIn;
import com.socialmedia.mapper.UserMapper;
import com.socialmedia.model.FriendshipStatus;
import com.socialmedia.util.CookieMgr;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping(value = "/api/v1/users")
public class UserController {

  private UserMapper userMapper;
  private CookieMgr cookieMgr;

  @Autowired
  public UserController(UserMapper userMapper, CookieMgr cookieMgr) {
    this.userMapper = userMapper;
    this.cookieMgr = cookieMgr;
  }

  @GetMapping("/current")
  public ResponseEntity<UserDtoOut> getCurrentUser(Principal principal) {

    return ResponseEntity.ok(userMapper.getById(principal.getName()));
  }

  @PostMapping
  public ResponseEntity<Token> signUp(@RequestBody UserRegistrationDtoIn userForm, HttpServletResponse resp) {
    Token token = userMapper.signUp(userForm);
    String refreshToken = userMapper.generateRefreshToken(userForm.getUsername());
    cookieMgr.addRefreshTokenCookie(resp, refreshToken);
    return ResponseEntity.ok(token);
  }

  @GetMapping("/email/confirm/{emailConfirmationId}")
  ResponseEntity<Boolean> confirmEmail(@PathVariable String emailConfirmationId) {
    return ResponseEntity.ok(userMapper.confirmEmail(emailConfirmationId));
  }

  @GetMapping("/{username}")
  ResponseEntity<UserDtoOut> getUser(@PathVariable String username) {
    return ResponseEntity.ok(userMapper.getById(username));
  }

  @GetMapping("/users_search/{query}")
  ResponseEntity<List<UserDtoOut>> usersSearch(@PathVariable String query, @PageableDefault Pageable pageable) {
    return ResponseEntity.ok(userMapper.usersSearch(query, pageable));
  }

  @PutMapping
  public ResponseEntity<UserDtoOut> updateUser(Principal principal,
                                               @RequestBody UserDtoIn user) {

    return ResponseEntity.ok(userMapper.update(principal.getName(), user));
  }

  @DeleteMapping
  public ResponseEntity<UserDtoOut> deleteUser(Principal principal) {

    return ResponseEntity.ok(userMapper.delete(principal.getName()));
  }

  @PostMapping("/reset_password")
  public ResponseEntity<String> resetPassword(@RequestBody UserRegistrationDtoIn emailOnly) {
    userMapper.sendChangePasswordLink(emailOnly.getEmail());
    return ResponseEntity.ok("Link to password update has been sent");
  }

  @PostMapping("/set_new_password/{forgotPasswordToken}")
  public ResponseEntity<String> setNewPassword(@PathVariable String forgotPasswordToken,
                                               @RequestBody UserRegistrationDtoIn passwordOnly) {
    userMapper.setNewPassword(forgotPasswordToken, passwordOnly.getPassword());
    return ResponseEntity.ok("Password was updated");
  }

  @Transactional
  @DeleteMapping("/friends/{friendUsername}")
  public ResponseEntity<UserDtoOut> deleteFriend(@PathVariable String friendUsername) {
    return ResponseEntity.ok(userMapper.deleteFriend(friendUsername));
  }

  @GetMapping("/friends/{username}")
  public ResponseEntity<List<UserLabelDtoOut>> getUserFriends(@PathVariable String username, Pageable pageable) {
    return ResponseEntity.ok(userMapper.getUserFriends(pageable, username));
  }

  @GetMapping("/friends/suggest")
  public ResponseEntity<List<FriendSuggestionDtoOut>> getFriendSuggestions(
      @RequestParam(required = false) Integer size) {
    return ResponseEntity.ok(userMapper.getUserFriendSuggestions(size));
  }

  @GetMapping("/friends/status/{username}")
  public ResponseEntity<FriendshipStatus> checkFriendshipStatus(@PathVariable String username) {
    return ResponseEntity.ok(userMapper.checkFriendshipStatus(username));
  }

  @GetMapping("/friends/active")
  public ResponseEntity<List<UserLabelDtoOut>> getActiveFriends(
          @PageableDefault(sort = { "lastActivityTime" }, direction = Sort.Direction.DESC) Pageable pageable) {
    return ResponseEntity.ok(userMapper.getActiveFriends(pageable));
  }

}
