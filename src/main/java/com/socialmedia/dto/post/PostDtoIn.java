package com.socialmedia.dto.post;

import com.socialmedia.dto.comment.CommentDtoIn;
import com.socialmedia.dto.user.UserLabelDtoIn;
import lombok.Data;

import java.util.List;

@Data
public class PostDtoIn {
  private String message;
  private String image;
  private Boolean showEveryone;
}
