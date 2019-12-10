package com.socialmedia.dto.comment;

import com.socialmedia.dto.user.UserLabelDtoOut;
import lombok.Data;

@Data
public class CommentDtoOut {

  private Long id;
  private String message;
  private Long date;
  private UserLabelDtoOut author;

}
