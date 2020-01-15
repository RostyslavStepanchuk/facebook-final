package com.socialmedia.dto.post;

import com.socialmedia.dto.comment.CommentDtoOut;
import com.socialmedia.dto.image.ImageDtoOut;
import com.socialmedia.dto.user.UserLabelDtoOut;
import lombok.Data;

import java.util.List;

@Data
public class PostDtoOut {

  private Long id;
  private String message;
  private Long date;
  private ImageDtoOut image;
  private Boolean showEveryone;
  private UserLabelDtoOut author;
  private UserLabelDtoOut owner;
  private List<CommentDtoOut> comments;
  private List<UserLabelDtoOut> likes;

}
