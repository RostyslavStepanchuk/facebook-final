package com.socialmedia.service;

import com.socialmedia.exception.NoDataFoundException;
import com.socialmedia.model.ApplicationUser;
import com.socialmedia.model.Post;
import com.socialmedia.repository.PostRepository;
import com.socialmedia.repository.UserRepository;
import com.socialmedia.util.SmartCopyBeanUtilsBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public final class PostService extends AbstractCrudService<Post, Long, PostRepository> {

  private UserRepository userRepository;

  @Autowired
  public PostService(PostRepository jpaRepository, SmartCopyBeanUtilsBean beanUtilsBean, UserRepository userRepository) {
    super(jpaRepository, beanUtilsBean);
    this.userRepository = userRepository;
  }

  @Override
  public Post create(Post entity) {
    entity.setDate(new Date().getTime());
    return super.create(entity);
  }

  @Override
  public Post delete(Long id) {
    Principal principal = SecurityContextHolder.getContext().getAuthentication();
    Optional<Post> existingEntity = jpaRepository.findById(id);
    Post post = existingEntity.orElseThrow(() -> new NoDataFoundException("Post wasn't found"));

    if (principal.getName().equals(post.getAuthor().getUsername())) {
      return super.delete(id);
    } else {
      throw new BadCredentialsException("You can only delete your own posts");
    }
  }

  public List<Post> findAllUsersPosts() {
    Principal principal = SecurityContextHolder.getContext().getAuthentication();

    return jpaRepository.findAllByOwner_Username(principal.getName());
  }

  public List<Post> findAllUsersPosts(String feedOwner) {
    return jpaRepository.findAllByOwner_Username(feedOwner);
  }

  public List<Post> getAllPostsForFeed() {
    Principal principal = SecurityContextHolder.getContext().getAuthentication();
    Optional<ApplicationUser> userEntity = userRepository.findById(principal.getName());
    ApplicationUser user = userEntity.orElseThrow(() -> new NoDataFoundException("User wasn't found"));
    List<ApplicationUser> userFriends = user.getFriends();
    List <List<Post>> userFriendsPosts = userFriends
        .stream()
        .map(userFriend -> jpaRepository.findAllByOwner_Username(userFriend.getId()))
        .collect(Collectors.toList());
    List<Post> userPosts = jpaRepository.findAllByOwner_Username(principal.getName());
    userFriendsPosts.add(userPosts);

    return  userFriendsPosts
        .stream()
        .flatMap(c -> c.stream())
        .sorted((p1,p2) -> (int) (p1.getDate() - p2.getDate()))
        .collect(Collectors.toList());
  }
}
