package com.socialmedia.mapper;

import com.socialmedia.model.EmailAddress;
import org.springframework.stereotype.Component;

@Component
public class EmailMapper {

  public String stringOf(EmailAddress entity) {
    return entity.getAddress();
  }

  public EmailAddress entityOf(String address) {
    EmailAddress emailAddress = new EmailAddress();
    emailAddress.setAddress(address);
    return emailAddress;
  }

}
