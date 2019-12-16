package com.socialmedia.mapper;

import com.socialmedia.dto.email.EmailAddressDtoIn;
import com.socialmedia.dto.security.Token;
import com.socialmedia.dto.user.UserDtoIn;
import com.socialmedia.dto.user.UserDtoOut;
import com.socialmedia.dto.user.UserLabelDtoOut;
import com.socialmedia.dto.user.UserRegistrationDtoIn;
import com.socialmedia.model.ApplicationUser;
import com.socialmedia.model.EmailAddress;
import com.socialmedia.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public final class UserMapper extends
    AbstractControllerToCrudServiceMapper<ApplicationUser, String, UserDtoIn, UserDtoOut, UserService> {

  private EmailMapper emailMapper;

  @Autowired
  public UserMapper(ModelMapper modelMapper,
                    UserService crudService, EmailMapper emailMapper) {
    super(modelMapper, crudService);
    this.emailMapper = emailMapper;
  }

  public Token signUp(UserRegistrationDtoIn registrationData) {

    return crudService.signUp(entityOf(registrationData));
  }

  @Override
  protected UserDtoOut responseDtoOf(ApplicationUser entity) {
    UserDtoOut user = modelMapper.map(entity, UserDtoOut.class);
    user.setEmail(entity.getEmailAddress().getAddress());
    return user;
  }

  @Override
  ApplicationUser entityOf(UserDtoIn dtoIn) {

    ApplicationUser user = modelMapper.map(dtoIn, ApplicationUser.class);
    user.setEmailAddress(emailMapper.entityOf(dtoIn.getEmail()));
    return user;
  }

  private ApplicationUser entityOf(UserRegistrationDtoIn userData) {

    ApplicationUser user = modelMapper.map(userData, ApplicationUser.class);
    EmailAddress emailAddress = emailMapper.entityOf(userData.getEmail());
    user.setEmailAddress(emailAddress);
    return user;
  }

  private UserLabelDtoOut userLabelDtoOf(ApplicationUser entity) {

    return modelMapper.map(entity, UserLabelDtoOut.class);
  }

  public Boolean confirmEmail(EmailAddressDtoIn emailData) {
    return crudService.confirmEmail(emailData.getEmail().toLowerCase(), emailData.getConfirmationId());
  }
}


