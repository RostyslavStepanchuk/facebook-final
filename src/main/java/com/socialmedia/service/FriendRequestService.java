package com.socialmedia.service;

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
import java.util.stream.Collectors;

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


  public ApplicationUser confirmRequest(Long requestId) {
    Principal principal = SecurityContextHolder.getContext().getAuthentication();
    ApplicationUser user = userService.getById(principal.getName());
    ApplicationUser requester = getById(requestId).getRequester();

    List<ApplicationUser> userFriends = user.getFriends();
    userFriends.add(requester);

    List<ApplicationUser> requesterFriends = requester.getFriends();
    requesterFriends.add(user);

    List<FriendRequest> requests = user.getIncomingFriendRequests();
    requests.stream().filter(request -> request.getId().equals(requestId)).findAny().ifPresent(requests::remove);

    requester.setFriends(requesterFriends);
    user.setFriends(userFriends);
    user.setIncomingFriendRequests(requests);

    return userService.getById(principal.getName());
  }

  public ApplicationUser deleteRequest(Long requestId) {
    Principal principal = SecurityContextHolder.getContext().getAuthentication();
    ApplicationUser user = userService.getById(principal.getName());

    List<FriendRequest> requests = user.getIncomingFriendRequests();
    requests.stream().filter(request -> request.getId().equals(requestId)).findAny().ifPresent(requests::remove);

    user.setIncomingFriendRequests(requests);

    return userService.getById(principal.getName());
  }
}
