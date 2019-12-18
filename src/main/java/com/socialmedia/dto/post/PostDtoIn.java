package com.socialmedia.dto.post;

import com.socialmedia.dto.comment.CommentDtoIn;
import com.socialmedia.dto.user.UserLabelDtoIn;

import java.util.List;

public class PostDtoIn {
  private Long id;
  private String message;
  private Long date;
  private String image;
  private Boolean showEveryone;
  private UserLabelDtoIn author;
  private List<CommentDtoIn> comments;
  private List<UserLabelDtoIn> likes;
}
