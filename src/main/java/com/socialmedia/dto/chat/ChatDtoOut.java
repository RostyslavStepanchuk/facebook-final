package com.socialmedia.dto.chat;

import com.socialmedia.dto.user.UserLabelDtoOut;
import lombok.Data;

import java.util.List;

@Data
public class ChatDtoOut {
  private Long id;
  private String name;
  private List<UserLabelDtoOut> participants;
}
