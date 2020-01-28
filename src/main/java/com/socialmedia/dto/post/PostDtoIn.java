package com.socialmedia.dto.post;

import com.socialmedia.dto.image.ImageDtoIn;
import com.socialmedia.dto.user.UserLabelDtoIn;
import lombok.Data;

import java.util.List;

@Data
public class PostDtoIn {
  private String message;
  private ImageDtoIn image;
  private Boolean showEveryone;
  private List<UserLabelDtoIn> taggedUsers;
}
