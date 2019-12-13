package com.socialmedia.mapper;

import com.socialmedia.dto.security.UserCredentials;
import com.socialmedia.dto.user.UserDtoIn;
import com.socialmedia.dto.user.UserDtoOut;
import com.socialmedia.dto.user.UserLabelDtoOut;
import com.socialmedia.model.ApplicationUser;
import com.socialmedia.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public final class UserMapper extends
    AbstractControllerToServiceMapper<ApplicationUser, String, UserDtoIn, UserDtoOut, UserService> {

  @Autowired
  public UserMapper(ModelMapper modelMapper, UserService crudService) {
    super(modelMapper, crudService);
  }

  public void createFromCredentials(UserCredentials credentials) {
    ApplicationUser entity = entityOf(credentials);
    crudService.create(entity);
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

  private ApplicationUser entityOf(UserCredentials credentials) {
    return modelMapper.map(credentials, ApplicationUser.class);
  }

  private UserLabelDtoOut userLabelDtoOf(ApplicationUser entity) {
    return modelMapper.map(entity, UserLabelDtoOut.class);
  }
  
}


