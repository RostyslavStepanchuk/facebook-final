package com.socialmedia.dto.chat;

import com.socialmedia.dto.chat.message.ChatMessageDtoIn;
import com.socialmedia.dto.user.UserLabelDtoIn;

import java.util.List;

public class ChatDtoIn {
    private Long id;
    private String name;
    private List<UserLabelDtoIn> participants;
    private List<ChatMessageDtoIn> messages;

}
