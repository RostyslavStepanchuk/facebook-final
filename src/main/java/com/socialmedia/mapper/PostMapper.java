package com.socialmedia.mapper;

import com.socialmedia.dto.post.PostDtoIn;
import com.socialmedia.dto.post.PostDtoOut;
import com.socialmedia.model.ApplicationUser;
import com.socialmedia.model.Post;
import com.socialmedia.service.PostService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

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
    post.setAuthor(author);
    return post;
  }
}
