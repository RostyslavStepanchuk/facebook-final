package com.socialmedia.service;

import com.socialmedia.exception.NoDataFoundException;
import com.socialmedia.model.ApplicationUser;
import com.socialmedia.model.Comment;
import com.socialmedia.model.Image;
import com.socialmedia.model.Post;
import com.socialmedia.repository.PostRepository;
import com.socialmedia.util.SmartCopyBeanUtilsBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public final class PostService extends AbstractCrudService<Post, Long, PostRepository> {

  private UserService userService;
  private AmazonService imageService;

  @Autowired
  public PostService(PostRepository jpaRepository,
                     SmartCopyBeanUtilsBean beanUtilsBean,
                     @Lazy UserService userService,
                     AmazonService imageService) {
    super(jpaRepository, beanUtilsBean);
    this.userService = userService;
    this.imageService = imageService;
  }

  @Override
  public Post create(Post entity) {
    if (entity.getImage() != null) {
      Image postImage = imageService.getById(entity.getImage().getId());
      entity.setImage(postImage);
    }
    entity.setDate(System.currentTimeMillis());
    return super.create(entity);
  }

  @Override
  public Post delete(Long id) {
    Principal principal = SecurityContextHolder.getContext().getAuthentication();
    Post post = getById(id);

    final boolean hasCredentialsToDelete = principal.getName().equals(post.getAuthor().getUsername())
        || principal.getName().equals(post.getOwner().getUsername());

    if (hasCredentialsToDelete) {
      Image image = post.getImage();
      post.setImage(null);
      imageService.delete(image.getId());
      return super.delete(id);
    } else {
      throw new BadCredentialsException("You can only delete your own posts");
    }
  }

  @Override
  public Post update(Post existingEntity, Post incomingEntity) {
    if (existingEntity.getImage() != null && existingEntity.getImage().sameEntity(incomingEntity.getImage())) {
      imageService.delete(existingEntity.getImage().getId());
    }
    return super.update(existingEntity, incomingEntity);
  }

  public List<Post> findAllPostsAuthoredBy(String username) {
    return jpaRepository.findAllByAuthor_Username(username);
  }

  public List<Post> findAllUsersPosts(String username) {
    return jpaRepository.findAllByOwner_Username(username);
  }

  public Page<Post> findAllUsersPosts(Pageable pageable) {

    Principal principal = SecurityContextHolder.getContext().getAuthentication();
    return jpaRepository.findAllByOwner_Username(principal.getName(), pageable);
  }

  public Page<Post> findAllUsersPosts(String feedOwner, Pageable pageable) {

    return jpaRepository.findAllByOwner_Username(feedOwner, pageable);
  }

  public Page<Post> getAllPostsForFeed(Pageable pageable) {
    Principal principal = SecurityContextHolder.getContext().getAuthentication();
    ApplicationUser user = userService.getById(principal.getName());
    List<ApplicationUser> postOwners = user.getFriends();
    postOwners.add(user);

    List<String> ownersIds = postOwners.stream()
        .map(ApplicationUser::getId)
        .collect(Collectors.toList());

    return jpaRepository.getAllByPostOwner(ownersIds, pageable);
  }

  public Post updateLikes(Long postId) {
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
    return jpaRepository.save(post);
  }

  public Post createComment(Long postId, Comment comment) {
    Principal principal = SecurityContextHolder.getContext().getAuthentication();
    ApplicationUser author = userService.getById(principal.getName());
    Post post = getById(postId);
    comment.setDate(System.currentTimeMillis());
    comment.setAuthor(author);
    comment.setPost(post);

    List<Comment> comments = post.getComments();
    comments.add(comment);

    return jpaRepository.save(post);
  }

  public Post deleteComment(Long postId, Long commentId) {
    Principal principal = SecurityContextHolder.getContext().getAuthentication();
    Post post = getById(postId);
    List<Comment> comments = post.getComments();
    Comment comment = comments.stream()
        .filter(item -> item.getId().equals(commentId))
        .findFirst()
        .orElseThrow(()-> new NoDataFoundException(String.format("Comment with id %d wasn't found", commentId)));

    final boolean hasCredentialsToDelete = principal.getName().equals(post.getAuthor().getUsername())
            || principal.getName().equals(post.getOwner().getUsername())
            || principal.getName().equals(comment.getAuthor().getUsername());

    if (hasCredentialsToDelete) {
      comments.stream().filter(item -> item.getId().equals(commentId)).findAny().ifPresent(comments::remove);
      post.setComments(comments);
      return jpaRepository.save(post);
    } else {
      throw new BadCredentialsException("You can only delete your own comments");
    }
  }

  public List<Image> getUserPhotosFromPosts(String userId, Pageable pageable) {
    String user;
    Principal principal = SecurityContextHolder.getContext().getAuthentication();
    if (userId == null) {
      user = principal.getName();
    } else {
      user = userId;
    }
    Page<Post> allPostsByOwner = jpaRepository.findAllByOwnerUsernameAndImageNotNull(user, pageable);
    List<Image> collect = allPostsByOwner.stream()
        .map(Post::getImage)
        .collect(Collectors.toList());
    return collect;
  }
}
