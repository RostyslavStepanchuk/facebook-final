package com.socialmedia.controller;

import com.socialmedia.dto.user.UserDtoOut;
import com.socialmedia.mapper.FriendRequestMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "api/v1/requests")
public class FriendRequestController {

  private FriendRequestMapper friendRequestMapper;

  @Autowired
  public FriendRequestController(FriendRequestMapper friendRequestMapper) {
    this.friendRequestMapper = friendRequestMapper;
  }

  @Transactional
  @PutMapping("/{requestId}")
  public ResponseEntity<UserDtoOut> confirmRequest(@PathVariable Long requestId) {
    return ResponseEntity.ok(friendRequestMapper.confirmRequest(requestId));
  }

  @Transactional
  @DeleteMapping("/{requestId}")
  public ResponseEntity<UserDtoOut> deleteRequest(@PathVariable Long requestId) {
    return ResponseEntity.ok(friendRequestMapper.deleteRequest(requestId));
  }
}
