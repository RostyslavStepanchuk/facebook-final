package com.socialmedia.dto.email;

import lombok.Data;

@Data
public class EmailAddressDtoIn {
  private String email;
  private String confirmationId;
}
