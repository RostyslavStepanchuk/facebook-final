package com.socialmedia.mapper;

import com.socialmedia.dto.post.PostDtoOut;
import com.socialmedia.model.Post;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class PostMapper {

  private ModelMapper modelMapper;

  @Autowired
  public PostMapper(ModelMapper modelMapper) {
    this.modelMapper = modelMapper;
  }

  public PostDtoOut toDto(Post entity) {
    return modelMapper.map(entity, PostDtoOut.class);
  }
}
