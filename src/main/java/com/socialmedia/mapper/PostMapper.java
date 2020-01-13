package com.socialmedia.mapper;

import com.socialmedia.dto.comment.CommentDtoIn;
import com.socialmedia.dto.comment.CommentDtoOut;
import com.socialmedia.dto.post.PostDtoIn;
import com.socialmedia.dto.post.PostDtoOut;
import com.socialmedia.model.ApplicationUser;
import com.socialmedia.model.Comment;
import com.socialmedia.model.Post;
import com.socialmedia.service.PostService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.security.Principal;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
public class PostMapper extends AbstractControllerToCrudServiceMapper<Post,Long, PostDtoIn, PostDtoOut, PostService> {

  private UserMapper userMapper;

  @Autowired
  public PostMapper(ModelMapper modelMapper, PostService postService, UserMapper userMapper) {
    super(modelMapper, postService);
    this.userMapper = userMapper;
  }

  @Override
  PostDtoOut responseDtoOf(Post entity) {
    return modelMapper.map(entity, PostDtoOut.class);
  }

  @Override
  Post entityOf(PostDtoIn dtoIn) {
    Post post = modelMapper.map(dtoIn, Post.class);
    Principal principal = SecurityContextHolder.getContext().getAuthentication();
    ApplicationUser author = userMapper.entityOf(principal.getName());
    post.setOwner(author);
    post.setAuthor(author);

    return post;
  }

  Post entityOf(PostDtoIn dtoIn, String ownerUsername) {
    Post post = modelMapper.map(dtoIn, Post.class);
    Principal principal = SecurityContextHolder.getContext().getAuthentication();
    ApplicationUser author = userMapper.entityOf(principal.getName());
    ApplicationUser owner = userMapper.entityOf(ownerUsername);
    post.setAuthor(author);
    post.setOwner(owner);

    return post;
  }

  public PostDtoOut createPostInOtherFeed(PostDtoIn dtoIn, String feedOwner) {
    Post entity = entityOf(dtoIn, feedOwner);

    return responseDtoOf(crudService.create(entity));
  }

  public List<PostDtoOut> getAllPostsForFeed() {

    return crudService.getAllPostsForFeed()
        .stream()
        .map(this::responseDtoOf)
        .collect(Collectors.toList());
  }

  public List<PostDtoOut> getAllUsersPosts() {

    return crudService.findAllUsersPosts()
        .stream()
        .map(this::responseDtoOf)
        .collect(Collectors.toList());
  }

  public List<PostDtoOut> getAllUsersPosts(String feedOwner) {

    return crudService.findAllUsersPosts(feedOwner)
        .stream()
        .map(this::responseDtoOf)
        .collect(Collectors.toList());
  }

  public void updateLikes(Long postId) {
    crudService.updateLikes(postId);
  }

  public List<CommentDtoOut> createComment(Long postId, CommentDtoIn commentDtoIn) {
    Comment comment = modelMapper.map(commentDtoIn, Comment.class);

    return crudService.createComment(postId, comment).stream()
            .map(entity -> modelMapper.map(entity, CommentDtoOut.class))
            .collect(Collectors.toList());
  }
}
