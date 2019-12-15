package com.socialmedia.mapper;

import com.socialmedia.dto.comment.CommentDtoIn;
import com.socialmedia.dto.comment.CommentDtoOut;
import com.socialmedia.model.Comment;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CommentMapper {

  private ModelMapper modelMapper;

  @Autowired
  public CommentMapper(ModelMapper modelMapper) {
    this.modelMapper = modelMapper;
  }

  public CommentDtoOut toDto(Comment entity) {
    return modelMapper.map(entity, CommentDtoOut.class);
  }

  public Comment toEntity(CommentDtoIn commentDtoIn) {
    return modelMapper.map(commentDtoIn, Comment.class);
  }
}
