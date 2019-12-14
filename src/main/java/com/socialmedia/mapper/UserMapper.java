package com.socialmedia.mapper;

import com.socialmedia.dto.security.Token;
import com.socialmedia.dto.user.UserDtoIn;
import com.socialmedia.dto.user.UserDtoOut;
import com.socialmedia.dto.user.UserLabelDtoOut;
import com.socialmedia.dto.user.UserRegistrationDtoIn;
import com.socialmedia.model.ApplicationUser;
import com.socialmedia.service.AuthenticationService;
import com.socialmedia.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public final class UserMapper extends
    AbstractControllerToCrudServiceMapper<ApplicationUser, String, UserDtoIn, UserDtoOut, UserService> {

  private AuthenticationService authenticationService;

  @Autowired
  public UserMapper(ModelMapper modelMapper,
                    UserService crudService,
                    AuthenticationService authenticationService) {
    super(modelMapper, crudService);
    this.authenticationService = authenticationService;
  }

  public Token create(UserRegistrationDtoIn registrationData) {
    ApplicationUser entity = entityOf(registrationData);
    crudService.create(entity);
    return authenticationService.getAccessToken(
        registrationData.getUsername(),
        registrationData.getPassword());
  }

  @Override
  protected UserDtoOut responseDtoOf(ApplicationUser entity) {
    UserDtoOut result = modelMapper.map(entity, UserDtoOut.class);
    return modelMapper.map(entity, UserDtoOut.class);
  }

  @Override
  ApplicationUser entityOf(UserDtoIn dtoIn) {
    return modelMapper.map(dtoIn, ApplicationUser.class);
  }

  private ApplicationUser entityOf(UserRegistrationDtoIn userData) {
    return modelMapper.map(userData, ApplicationUser.class);
  }

  private UserLabelDtoOut userLabelDtoOf(ApplicationUser entity) {
    return modelMapper.map(entity, UserLabelDtoOut.class);
  }
  
}


