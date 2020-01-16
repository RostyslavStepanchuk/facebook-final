package com.socialmedia.dto.user;

import com.socialmedia.dto.image.ImageDtoIn;
import com.socialmedia.model.Gender;
import lombok.Data;

@Data
public class UserDtoIn {
  private String email;
  private String firstName;
  private String lastName;
  private Long birthDate;
  private ImageDtoIn avatar;
  private ImageDtoIn profileCover;
  private Gender gender;
  private Boolean openAccount;
}
