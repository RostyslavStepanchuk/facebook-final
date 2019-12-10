package com.socialmedia.dto.friend.request;

import com.socialmedia.dto.user.UserLabelDtoOut;
import lombok.Data;

@Data
public class FriendRequestDtoOut {

  private Long id;
  private Long date;
  private UserLabelDtoOut requester;
}
