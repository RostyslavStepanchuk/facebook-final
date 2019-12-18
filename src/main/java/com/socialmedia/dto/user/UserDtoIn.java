package com.socialmedia.dto.user;

import com.socialmedia.dto.friend.request.FriendRequestDtoIn;
import lombok.Data;

import java.util.List;

@Data
public class UserDtoIn {
  private String username;
  private String email;
  private String firstName;
  private String lastName;
  private String birthDate;
  private String avatar;
  private Boolean openAccount;
  private List<UserLabelDtoIn> friends;
  private List<FriendRequestDtoIn> incomingFriendRequests;
}
