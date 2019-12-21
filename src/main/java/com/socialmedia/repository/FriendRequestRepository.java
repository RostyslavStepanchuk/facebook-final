package com.socialmedia.repository;

import com.socialmedia.model.ApplicationUser;
import com.socialmedia.model.FriendRequest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FriendRequestRepository extends JpaRepository<FriendRequest, Long> {

  List<FriendRequest> getAllByRequester(ApplicationUser requester);

  List<FriendRequest> getAllByResponder(ApplicationUser requester);
}
