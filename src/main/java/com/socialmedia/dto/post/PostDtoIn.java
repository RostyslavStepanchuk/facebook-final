package com.socialmedia.dto.post;

import lombok.Data;

@Data
public class PostDtoIn {
  private String message;
  private String image;
  private Boolean showEveryone;
}
