package com.socialmedia.dto.user;

import com.socialmedia.dto.friend.request.FriendRequestDtoOut;
import com.socialmedia.model.Gender;
import lombok.Data;

import java.util.List;

@Data
public class UserDtoOut {

  private String username;
  private String email;
  private String firstName;
  private String lastName;
  private String birthDate;
  private String avatar;
  private String profileCover;
  private Gender gender;
  private Boolean openAccount;
  private List<UserLabelDtoOut> friends;
  private List<FriendRequestDtoOut> incomingFriendRequests;
  private Boolean emailIsConfirmed;
}
