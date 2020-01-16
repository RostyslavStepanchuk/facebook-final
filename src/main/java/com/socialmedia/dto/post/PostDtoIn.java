package com.socialmedia.dto.post;

import com.socialmedia.dto.image.ImageDtoIn;
import lombok.Data;

@Data
public class PostDtoIn {
  private String message;
  private ImageDtoIn image;
  private Boolean showEveryone;
}
