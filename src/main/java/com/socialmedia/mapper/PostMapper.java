package com.socialmedia.mapper;

import com.socialmedia.dto.post.PostDtoIn;
import com.socialmedia.dto.post.PostDtoOut;
import com.socialmedia.model.ApplicationUser;
import com.socialmedia.model.Post;
import com.socialmedia.service.PostService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
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
    ApplicationUser author = userMapper.entityOf(dtoIn.getAuthorId());
    post.setOwner(author);
    post.setAuthor(author);

    return post;
  }

  Post entityOf(PostDtoIn dtoIn, String ownerUsername) {
    Post post = modelMapper.map(dtoIn, Post.class);
    ApplicationUser author = userMapper.entityOf(dtoIn.getAuthorId());
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
}
