package com.socialmedia.controller;

import com.socialmedia.dto.user.UserDtoOut;
import com.socialmedia.mapper.FriendRequestMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "api/v1/requests")
public class FriendRequestController {

    private FriendRequestMapper friendRequestMapper;

    @Autowired
    public FriendRequestController(FriendRequestMapper friendRequestMapper) {
        this.friendRequestMapper = friendRequestMapper;
    }

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
