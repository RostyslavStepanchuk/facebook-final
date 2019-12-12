package com.socialmedia.mapper;

import com.socialmedia.dto.friend.request.FriendRequestDtoIn;
import com.socialmedia.dto.friend.request.FriendRequestDtoOut;
import com.socialmedia.model.FriendRequest;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class FriendRequestMapper {

  private ModelMapper modelMapper;

  @Autowired
  public FriendRequestMapper(ModelMapper modelMapper) {
    this.modelMapper = modelMapper;
  }

  public FriendRequestDtoOut toDto(FriendRequest entity) {
    return modelMapper.map(entity, FriendRequestDtoOut.class);
  }

  public FriendRequest toEntity(FriendRequestDtoIn friendRequestDtoIn){
    return modelMapper.map(friendRequestDtoIn, FriendRequest.class);
  }
}
