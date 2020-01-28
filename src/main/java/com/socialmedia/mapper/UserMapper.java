package com.socialmedia.mapper;

import com.socialmedia.dto.security.Token;
import com.socialmedia.dto.user.FriendSuggestionDtoOut;
import com.socialmedia.dto.user.UserDtoIn;
import com.socialmedia.dto.user.UserDtoOut;
import com.socialmedia.dto.user.UserLabelDtoIn;
import com.socialmedia.dto.user.UserLabelDtoOut;
import com.socialmedia.dto.user.UserRegistrationDtoIn;
import com.socialmedia.model.ApplicationUser;
import com.socialmedia.model.FriendshipStatus;
import com.socialmedia.model.TokensData;
import com.socialmedia.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

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
    return modelMapper.map(dtoIn, ApplicationUser.class);
  }

  private ApplicationUser entityOf(UserRegistrationDtoIn userData) {

    ApplicationUser user = modelMapper.map(userData, ApplicationUser.class);
    user.setTokensData(new TokensData());
    return user;
  }

  public ApplicationUser entityOf(String userId) {
    return crudService.getById(userId);
  }

  public List<ApplicationUser> entityOf(List<UserLabelDtoIn> userLabels) {
    List<String> userIds = userLabels.stream()
        .map(UserLabelDtoIn::getUsername)
        .collect(Collectors.toList());
    return crudService.getAllUsersFromList(userIds);
  }

  public List<UserDtoOut> usersSearch(String query) {
    return crudService.getUsersByQuery(query)
        .stream()
        .map(this::responseDtoOf)
        .collect(Collectors.toList());
  }

  public UserLabelDtoOut userLabelDtoOf(ApplicationUser entity) {
    return modelMapper.map(entity, UserLabelDtoOut.class);
  }

  public Boolean confirmEmail(String emailConfirmationId) {
    return crudService.confirmEmail(emailConfirmationId);
  }

  public String generateRefreshToken(String username) {
    return crudService.generateRefreshToken(username);
  }

  public void sendChangePasswordLink(String email) {
    crudService.sendChangePasswordLink(email);
  }

  public void setNewPassword(String forgotPasswordToken, String password) {
    crudService.setNewPassword(forgotPasswordToken, password);
  }

  public UserDtoOut deleteFriend(String friendUsername) {
    return responseDtoOf(crudService.deleteFriend(friendUsername));
  }

  public List<UserLabelDtoOut> getUserFriends(Pageable pageable, String username) {
    return crudService.getUserFriends(pageable, username).stream().map(this::userLabelDtoOf).collect(Collectors.toList());
  }

  public List<FriendSuggestionDtoOut> getUserFriendSuggestions(Integer pageSize) {
    return crudService.getUserFriendSuggestions(pageSize)
        .entrySet().stream()
        .map(entry -> FriendSuggestionDtoOut.builder()
            .user(userLabelDtoOf(entry.getKey()))
            .commonFriends(entry.getValue().stream()
                .map(this::userLabelDtoOf)
                .collect(Collectors.toList()))
            .build())
        .collect(Collectors.toList());
  }

  public FriendshipStatus checkFriendshipStatus(String username) {
    return crudService.checkFriendshipStatus(username);
  }
}


