package com.socialmedia.mapper;

import com.socialmedia.dto.friend.request.FriendRequestDtoIn;
import com.socialmedia.dto.friend.request.FriendRequestDtoOut;
import com.socialmedia.dto.user.UserDtoOut;
import com.socialmedia.dto.user.UserLabelDtoOut;
import com.socialmedia.model.FriendRequest;
import com.socialmedia.service.FriendRequestService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class FriendRequestMapper
        extends AbstractControllerToCrudServiceMapper
        <FriendRequest, Long, FriendRequestDtoIn, FriendRequestDtoOut, FriendRequestService> {

  private UserMapper userMapper;

  @Autowired
  public FriendRequestMapper(ModelMapper modelMapper,UserMapper userMapper, FriendRequestService friendRequestService) {
    super(modelMapper, friendRequestService);
    this.userMapper = userMapper;
  }

  @Override
  FriendRequestDtoOut responseDtoOf(FriendRequest entity) {
    return modelMapper.map(entity, FriendRequestDtoOut.class);
  }

  @Override
  FriendRequest entityOf(FriendRequestDtoIn friendRequestDtoIn) {
    return modelMapper.map(friendRequestDtoIn, FriendRequest.class);
  }

  public UserDtoOut createRequest(String responderUsername) {
    return userMapper.responseDtoOf(crudService.createRequest(responderUsername));
  }

  public UserLabelDtoOut confirmRequest(Long requestId) {
    return userMapper.userLabelDtoOf(crudService.confirmRequest(requestId));
  }

  public FriendRequestDtoOut deleteRequest(Long requestId) {
    return responseDtoOf(crudService.deleteRequest(requestId));
  }


  public List<FriendRequestDtoOut> getAllRequests() {
    return crudService.getAllRequests().stream()
        .map(this::responseDtoOf)
        .collect(Collectors.toList());
  }
}
