package com.socialmedia.dto.comment;

import com.socialmedia.dto.user.UserLabelDtoIn;

public class CommentDtoIn {
    private Long id;
    private String message;
    private Long date;
    private UserLabelDtoIn author;

}
