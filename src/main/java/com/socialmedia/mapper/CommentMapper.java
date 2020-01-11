package com.socialmedia.mapper;

import com.socialmedia.dto.comment.CommentDtoIn;
import com.socialmedia.dto.comment.CommentDtoOut;
import com.socialmedia.model.Comment;
import com.socialmedia.service.CommentService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CommentMapper extends
        AbstractControllerToCrudServiceMapper<Comment, Long, CommentDtoIn, CommentDtoOut, CommentService> {

  @Autowired
  public CommentMapper(ModelMapper modelMapper, CommentService commentService) {
    super(modelMapper, commentService);
  }

  @Override
  CommentDtoOut responseDtoOf(Comment entity) {
    return modelMapper.map(entity, CommentDtoOut.class);
  }

  @Override
  Comment entityOf(CommentDtoIn commentDtoIn) {
    return modelMapper.map(commentDtoIn, Comment.class);
  }

  public CommentDtoOut createComment(Long postId, CommentDtoIn commentDtoIn) {
    Comment comment = entityOf(commentDtoIn);
    return responseDtoOf(crudService.createComment(comment, postId));
  }
}
