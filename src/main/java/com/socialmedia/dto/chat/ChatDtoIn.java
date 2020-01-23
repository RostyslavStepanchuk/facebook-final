package com.socialmedia.dto.chat;

import com.socialmedia.dto.user.UserLabelDtoIn;
import lombok.Data;

import java.util.List;

@Data
public class ChatDtoIn {
  private String name;
  private List<UserLabelDtoIn> participants;
}
