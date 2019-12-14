package com.socialmedia.mapper;

import com.socialmedia.dto.security.Token;
import com.socialmedia.dto.user.UserDtoIn;
import com.socialmedia.dto.user.UserDtoOut;
import com.socialmedia.dto.user.UserLabelDtoOut;
import com.socialmedia.dto.user.UserRegistrationDtoIn;
import com.socialmedia.model.ApplicationUser;
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

    ApplicationUser entity = entityOf(registrationData);
    return crudService.signUp(entity);
  }

  @Override
  protected UserDtoOut responseDtoOf(ApplicationUser entity) {

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


