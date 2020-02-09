package com.socialmedia.dto.chat.message;

import com.socialmedia.dto.chat.ChatDtoOut;
import com.socialmedia.dto.user.UserLabelDtoOut;
import lombok.Data;

@Data
public class ChatMessageDtoOut {

  private Long id;
  private String text;
  private Long date;
  private UserLabelDtoOut author;
  private ChatDtoOut chat;

}
