package com.socialmedia.dto.user;

import com.socialmedia.dto.image.ImageDtoOut;
import lombok.Data;

@Data
public class UserLabelDtoOut {

  private String username;
  private String firstName;
  private String lastName;
  private ImageDtoOut avatar;
}
