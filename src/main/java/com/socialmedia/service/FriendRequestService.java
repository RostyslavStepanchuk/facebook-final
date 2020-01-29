package com.socialmedia.service;

import com.amazonaws.services.kinesis.model.InvalidArgumentException;
import com.socialmedia.model.ApplicationUser;
import com.socialmedia.model.FriendRequest;
import com.socialmedia.repository.FriendRequestRepository;
import com.socialmedia.util.SmartCopyBeanUtilsBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;

@Service
public class FriendRequestService extends AbstractCrudService<FriendRequest, Long, FriendRequestRepository> {

  private UserService userService;

  @Autowired
  public FriendRequestService(FriendRequestRepository jpaRepository,
                              SmartCopyBeanUtilsBean beanUtilsBean,
                              @Lazy UserService userService) {
    super(jpaRepository, beanUtilsBean);
    this.userService = userService;
  }

  public List<FriendRequest> getAllByResponder(ApplicationUser user) {
    return jpaRepository.getAllByResponder(user);
  }

  public List<FriendRequest> getAllByRequester(ApplicationUser user) {
    return jpaRepository.getAllByRequester(user);
  }

  public ApplicationUser createRequest(String responderUsername) {
    Principal principal = SecurityContextHolder.getContext().getAuthentication();
    ApplicationUser user = userService.getById(principal.getName());
    ApplicationUser responder = userService.getById(responderUsername);

    FriendRequest friendRequest = new FriendRequest();
    friendRequest.setDate(System.currentTimeMillis());
    friendRequest.setRequester(user);
    friendRequest.setResponder(responder);

    jpaRepository.save(friendRequest);
    return user;
  }

  public ApplicationUser confirmRequest(Long requestId) {
    Principal principal = SecurityContextHolder.getContext().getAuthentication();
    ApplicationUser user = userService.getById(principal.getName());
    ApplicationUser requester = getById(requestId).getRequester();

    List<ApplicationUser> userFriends = user.getFriends();
    userFriends.add(requester);

    List<ApplicationUser> requesterFriends = requester.getFriends();
    requesterFriends.add(user);

    requester.setFriends(requesterFriends);
    user.setFriends(userFriends);

    deleteRequestFromIncoming(user, requestId);
    userService.update(requester);
    userService.update(user);
    return requester;
  }

  public FriendRequest deleteRequest(Long requestId) {
    Principal principal = SecurityContextHolder.getContext().getAuthentication();
    ApplicationUser user = userService.getById(principal.getName());

    FriendRequest deletedRequest = deleteRequestFromIncoming(user, requestId);
    userService.update(user);
    return deletedRequest;
  }

  private FriendRequest deleteRequestFromIncoming(ApplicationUser user, Long requestId) {
    List<FriendRequest> requests = user.getIncomingFriendRequests();
    FriendRequest deletedRequest = requests.stream()
        .filter(req -> req.getId() == requestId)
        .findFirst()
        .orElseThrow(() ->
            new InvalidArgumentException(String.format("Request %d was not found for current user", requestId)));
    requests.stream().filter(request -> request.getId().equals(requestId)).findAny().ifPresent(requests::remove);
    user.setIncomingFriendRequests(requests);
    return deletedRequest;
  }

  public List<FriendRequest> getAllRequests() {
    String currentUserName = SecurityContextHolder.getContext().getAuthentication().getName();
    return jpaRepository.getAllByResponderUsername(currentUserName);
  }
}
