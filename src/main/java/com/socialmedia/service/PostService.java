package com.socialmedia.service;

import com.socialmedia.exception.NoDataFoundException;
import com.socialmedia.model.ApplicationUser;
import com.socialmedia.model.Post;
import com.socialmedia.repository.PostRepository;
import com.socialmedia.util.SmartCopyBeanUtilsBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public final class PostService extends AbstractCrudService<Post, Long, PostRepository> {

  private UserService userService;

  @Autowired
  public PostService(PostRepository jpaRepository, SmartCopyBeanUtilsBean beanUtilsBean, @Lazy UserService userService) {
    super(jpaRepository, beanUtilsBean);
    this.userService = userService;
  }

  @Override
  public Post create(Post entity) {
    entity.setDate(System.currentTimeMillis());
    return super.create(entity);
  }

  @Override
  public Post delete(Long id) {
    Principal principal = SecurityContextHolder.getContext().getAuthentication();
    Optional<Post> existingEntity = jpaRepository.findById(id);
    Post post = existingEntity.orElseThrow(() -> new NoDataFoundException("Post wasn't found"));

    final boolean hasCredentialsToDelete = principal.getName().equals(post.getAuthor().getUsername())
        || principal.getName().equals(post.getOwner().getUsername());

    if (hasCredentialsToDelete) {
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
    ApplicationUser user = userService.getById(principal.getName());
    List<ApplicationUser> postOwners = user.getFriends();
    postOwners.add(user);

    return postOwners.stream()
        .map(owner -> jpaRepository.findAllByOwner_Username(owner.getId()))
        .flatMap(Collection::stream)
        .sorted((p1, p2) -> (int) (p1.getDate() - p2.getDate()))
        .collect(Collectors.toList());
  }

  public void updateLikes(Long postId) {
    Principal principal = SecurityContextHolder.getContext().getAuthentication();
    ApplicationUser author = userService.getById(principal.getName());

    Post post = getById(postId);
    List<ApplicationUser> likes = post.getLikes();

    boolean isPresent = likes.stream()
            .anyMatch(like -> like.getUsername().equals(author.getUsername()));

    if (isPresent) {
      List<ApplicationUser> collect = post.getLikes()
              .stream().filter(like -> !like.getUsername().equals(author.getUsername()))
              .collect(Collectors.toList());
      post.setLikes(collect);
    } else {
      likes.add(author);
      post.setLikes(likes);
    }
    update(postId, post);
  }
}
