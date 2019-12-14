package com.socialmedia.mapper;

import com.socialmedia.dto.post.PostDtoIn;
import com.socialmedia.dto.post.PostDtoOut;
import com.socialmedia.model.Post;
import com.socialmedia.service.PostService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public final class PostMapper extends AbstractControllerToServiceMapper<Post, Long, PostDtoIn, PostDtoOut, PostService> {

  @Autowired
  public PostMapper(ModelMapper modelMapper, PostService crudService) {
    super(modelMapper, crudService);
  }

  @Override
  PostDtoOut responseDtoOf(Post entity) {
    return modelMapper.map(entity, PostDtoOut.class);
  }

  @Override
  Post entityOf(PostDtoIn dtoIn) {
    return modelMapper.map(dtoIn, Post.class);
  }

}
