package com.socialmedia.dto.chat;

import com.socialmedia.dto.chat.message.ChatMessageDtoOut;
import com.socialmedia.dto.user.UserLabelDtoOut;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
public class ChatDtoOutWithLastMessage extends ChatDtoOut {
  private ChatMessageDtoOut lastMessage;
}
