package com.socialmedia.mapper;

import com.socialmedia.dto.security.Token;
import com.socialmedia.dto.user.UserDtoIn;
import com.socialmedia.dto.user.UserDtoOut;
import com.socialmedia.dto.user.UserLabelDtoOut;
import com.socialmedia.dto.user.UserRegistrationDtoIn;
import com.socialmedia.model.ApplicationUser;
import com.socialmedia.model.TokensData;
import com.socialmedia.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public final class UserMapper extends
    AbstractControllerToCrudServiceMapper<ApplicationUser, String, UserDtoIn, UserDtoOut, UserService> {

  @Autowired
  public UserMapper(ModelMapper modelMapper,
                    UserService crudService) {
    super(modelMapper, crudService);
  }

  public Token signUp(UserRegistrationDtoIn registrationData) {

    return crudService.signUp(entityOf(registrationData));
  }

  @Override
  protected UserDtoOut responseDtoOf(ApplicationUser entity) {
    UserDtoOut user = modelMapper.map(entity, UserDtoOut.class);
    user.setEmailIsConfirmed(entity.getTokensData().getEmailIsConfirmed());
    return user;
  }

  @Override
  ApplicationUser entityOf(UserDtoIn dtoIn) {

    ApplicationUser user = modelMapper.map(dtoIn, ApplicationUser.class);
    return user;
  }

  private ApplicationUser entityOf(UserRegistrationDtoIn userData) {

    ApplicationUser user = modelMapper.map(userData, ApplicationUser.class);
    user.setTokensData(new TokensData());
    return user;
  }

  public ApplicationUser entityOf(String userId) {
    return crudService.getById(userId);
  }

  private UserLabelDtoOut userLabelDtoOf(ApplicationUser entity) {

    return modelMapper.map(entity, UserLabelDtoOut.class);
  }

  public Boolean confirmEmail(String emailConfirmationId) {
    return crudService.confirmEmail(emailConfirmationId);
  }

}


