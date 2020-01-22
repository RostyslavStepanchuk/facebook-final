package com.socialmedia.dto.user;

import com.socialmedia.dto.friend.request.FriendRequestDtoOut;
import com.socialmedia.dto.image.ImageDtoOut;
import com.socialmedia.model.Gender;
import lombok.Data;

import java.util.List;

@Data
public class UserDtoOut {

  private String username;
  private String email;
  private String firstName;
  private String lastName;
  private Long birthDate;
  private ImageDtoOut avatar;
  private ImageDtoOut profileCover;
  private Gender gender;
  private Boolean openAccount;
  private List<FriendRequestDtoOut> incomingFriendRequests;
  private Boolean emailIsConfirmed;
}
