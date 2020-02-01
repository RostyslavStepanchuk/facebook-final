package com.socialmedia.service;

import com.socialmedia.dto.security.Token;
import com.socialmedia.exception.NoDataFoundException;
import com.socialmedia.model.ApplicationUser;
import com.socialmedia.model.FriendshipStatus;
import com.socialmedia.model.TokensData;
import com.socialmedia.repository.UserRepository;
import com.socialmedia.util.EmailHandler;
import com.socialmedia.util.SmartCopyBeanUtilsBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Principal;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import static com.socialmedia.util.Constants.LAST_THRESHOLD_OF_ONLINE_ACTIVITY;
import static java.util.stream.Collectors.counting;
import static java.util.stream.Collectors.groupingBy;


@Service
public class UserService extends AbstractCrudService<ApplicationUser, String, UserRepository> {

  private BCryptPasswordEncoder bcryptPasswordEncoder;
  private AuthenticationService authenticationService;
  private ChatService chatService;
  private FriendRequestService friendRequestService;
  private PostService postService;
  private EmailHandler emailHandler;


  @Autowired
  public UserService(UserRepository jpaRepository,
                     SmartCopyBeanUtilsBean beanUtilBean,
                     BCryptPasswordEncoder bcryptPasswordEncoder,
                     AuthenticationService authenticationService,
                     ChatService chatService,
                     FriendRequestService friendRequestService,
                     PostService postService,
                     EmailHandler emailHandler) {
    super(jpaRepository, beanUtilBean);
    this.bcryptPasswordEncoder = bcryptPasswordEncoder;
    this.authenticationService = authenticationService;
    this.chatService = chatService;
    this.friendRequestService = friendRequestService;
    this.postService = postService;
    this.emailHandler = emailHandler;
  }

  @Override
  public ApplicationUser update(ApplicationUser user, ApplicationUser incomingEntity) {
    try {
      beanUtilsBean.copyProperties(user, incomingEntity);
      return jpaRepository.save(user);
    } catch (ReflectiveOperationException reflectionException) {
      throw new RuntimeException(reflectionException.getMessage());
    }
  }

  @Override
  public List<ApplicationUser> getAll() {
    return jpaRepository.findAll();
  }

  public Token signUp(ApplicationUser user) {

    if (jpaRepository.findById(user.getUsername()).isPresent()) {
      throw new BadCredentialsException(String.format("User with username %s already exists", user.getUsername()));
    }

    if (jpaRepository.findByEmail(user.getEmail()).isPresent()) {
      throw new BadCredentialsException(String.format("User with email %s already exists", user.getEmail()));
    }

    String password = user.getPassword();
    user.setPassword(bcryptPasswordEncoder.encode(password));
    TokensData tokensData = user.getTokensData();
    tokensData.setEmailIsConfirmed(false);
    tokensData.setEmailConfirmationId(UUID.randomUUID().toString());
    jpaRepository.save(user);
    emailHandler.sendEmailConfirmationLetter(user.getEmail(), tokensData.getEmailConfirmationId());
    return authenticationService.getAccessToken(user.getUsername(), password);
  }

  public Boolean confirmEmail(String confirmationId) {
    ApplicationUser user = jpaRepository.getByEmailConfirmationId(confirmationId)
        .orElseThrow(() -> new NoDataFoundException("Invalid email confirmation id"));
    user.getTokensData().setEmailIsConfirmed(true);
    jpaRepository.save(user);
    return true;
  }

  @Override
  @Transactional
  public ApplicationUser delete(String id) {
    ApplicationUser deletedUser = getById(id);

    deletedUser.getFriends().forEach(friend -> cancelFriendship(friend, id));
    deletedUser.getChats().forEach(chat -> chatService.removeParticipant(chat, id));
    friendRequestService.getAllByRequester(deletedUser).forEach(request -> friendRequestService.delete(request.getId()));
    friendRequestService.getAllByResponder(deletedUser).forEach(request -> friendRequestService.delete(request.getId()));
    postService.findAllPostsAuthoredBy(deletedUser.getUsername()).forEach(post -> postService.delete(post.getId()));
    postService.findAllUsersPosts(deletedUser.getUsername()).forEach(post -> postService.delete(post.getId()));
    deletedUser.setIncomingFriendRequests(Collections.emptyList());
    deletedUser.getLikedPosts().forEach(post -> {
      List<ApplicationUser> filteredLikes = post.getLikes().stream()
          .filter(user -> !user.getUsername().equals(id))
          .collect(Collectors.toList());
      post.setLikes(filteredLikes);
      postService.update(post.getId(), post);
    });
    jpaRepository.delete(deletedUser);

    return deletedUser;
  }

  public String generateRefreshToken(String username) {
    return authenticationService.generateRefreshToken(username);
  }

  public void sendChangePasswordLink(String email) {
    ApplicationUser user = jpaRepository.findByEmail(email).orElseThrow(() -> new BadCredentialsException("Invalid email"));
    String forgotPasswordToken = authenticationService.generateForgotPasswordToken(user);
    emailHandler.sendResetPasswordLetter(user.getEmail(), forgotPasswordToken);
  }

  public void setNewPassword(String forgotPasswordToken, String password) {
    ApplicationUser user = jpaRepository.getByTokensData_ForgotPasswordToken(forgotPasswordToken);
    if (user.getTokensData().getForgotPasswordTokenValidTill() < System.currentTimeMillis()) {
      throw new BadCredentialsException("Password recovery data has expired, please get new link");
    }
    user.setPassword(bcryptPasswordEncoder.encode(password));
    user.getTokensData().setForgotPasswordTokenValidTill(0L);
    jpaRepository.save(user);
  }

  public Page<ApplicationUser> getUsersByQuery(String query, Pageable pageable) {
    return jpaRepository.findAllByFirstOrLastName(query.toLowerCase(), pageable);
  }

  public ApplicationUser deleteFriend(String friendUsername) {
    ApplicationUser user = getById(currentUsername());
    cancelFriendship(user, friendUsername);

    ApplicationUser friend = getById(friendUsername);
    cancelFriendship(friend, user.getUsername());

    return friend;
  }

  private void cancelFriendship(ApplicationUser user, String friendUsername) {
    List<ApplicationUser> friends = user.getFriends();
    friends.stream().filter(friend -> friend.getUsername().equals(friendUsername))
        .findAny().ifPresent(friends::remove);

    user.setFriends(friends);
    jpaRepository.save(user);
  }

  public Page<ApplicationUser> getUserFriends(Pageable pageable, String username) {
    return jpaRepository.getAllUserFriends(username, pageable);
  }

  public  Map<ApplicationUser, List<ApplicationUser>> getUserFriendSuggestions(Integer pageSize) {
    if (pageSize == null) {
      pageSize = 10;
    }
    ApplicationUser originalUser = getById(currentUsername());

    return originalUser.getFriends().stream()
        .flatMap(friend -> friend.getFriends().stream())
        .collect(groupingBy(u -> u, counting()))
        .entrySet().stream()
        .sorted((o1, o2) -> (int) (o1.getValue() - o2.getValue()))
        .filter(entry -> isRelevantFriendSuggestion(entry.getKey(), originalUser))
        .limit(pageSize)
        .collect(Collectors.toMap(Map.Entry::getKey, entry -> getCommonFriends(originalUser, entry.getKey())));
  }

  public List<ApplicationUser> getAllUsersFromList(List<String> users) {
    return jpaRepository.getAllUsersFromList(users);
  }

  private List<ApplicationUser> getCommonFriends(ApplicationUser user1, ApplicationUser user2) {
    return user1.getFriends().stream()
        .filter(friend -> user2.getFriends().contains(friend))
        .collect(Collectors.toList());
  }

  private boolean isRelevantFriendSuggestion(ApplicationUser possibleFriend, ApplicationUser originalUser) {
    return !possibleFriend.getUsername().equals(originalUser.getUsername())
        && !originalUser.getFriends().contains(possibleFriend)
        && originalUser.getIncomingFriendRequests().stream()
        .noneMatch(req -> req.getRequester().getId().equals(possibleFriend.getId()))
        && possibleFriend.getIncomingFriendRequests().stream()
        .noneMatch(req -> req.getRequester().getId().equals(originalUser.getId()));
  }

  private String currentUsername() {
    return SecurityContextHolder.getContext().getAuthentication().getName();
  }

  public FriendshipStatus checkFriendshipStatus(String targetUsername) {
    ApplicationUser currentUser = getById(currentUsername());
    ApplicationUser targetUser = getById(targetUsername);
    if (currentUser.getIncomingFriendRequests().stream()
        .anyMatch(req -> req.getRequester().getUsername().equals(targetUsername))) {
      return FriendshipStatus.NEEDS_APPROVAL;
    } else if (targetUser.getIncomingFriendRequests().stream()
        .anyMatch(req -> req.getRequester().getUsername().equals(currentUser.getUsername()))) {
      return FriendshipStatus.WAITING_FOR_APPROVAL;
    } else if (currentUser.getFriends().contains(targetUser)) {
      return FriendshipStatus.FRIENDS;
    }
    return FriendshipStatus.NOT_FRIENDS;
  }

  public Page<ApplicationUser> getActiveFriends(Pageable pageable) {
    Principal principal = SecurityContextHolder.getContext().getAuthentication();
    ApplicationUser user = getById(principal.getName());
    long activityTime = System.currentTimeMillis() - LAST_THRESHOLD_OF_ONLINE_ACTIVITY;
    return jpaRepository.getActiveFriends(user, activityTime, pageable);
  }
}
