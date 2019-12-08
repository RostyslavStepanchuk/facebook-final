package com.socialmedia.mapper;

import com.socialmedia.dto.security.UserCredentials;
import com.socialmedia.dto.user.UserDtoIn;
import com.socialmedia.dto.user.UserDtoOut;
import com.socialmedia.dto.user.UserLabelDtoOut;
import com.socialmedia.model.ApplicationUser;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

  private ModelMapper modelMapper;

  @Autowired
  public UserMapper(ModelMapper modelMapper) {
    this.modelMapper = modelMapper;
  }

  public UserDtoOut toFullDto(ApplicationUser entity) {
    return modelMapper.map(entity, UserDtoOut.class);
  }

  public UserLabelDtoOut toLabelDto(ApplicationUser entity) {
    return modelMapper.map(entity, UserLabelDtoOut.class);
  }

  public ApplicationUser toEntity(UserDtoIn dto) {
    return modelMapper.map(dto, ApplicationUser.class);
  }

  public ApplicationUser toEntity(UserCredentials credentials) {
    return modelMapper.map(credentials, ApplicationUser.class);
  }

}


