package com.socialmedia.controller;


import com.socialmedia.dto.comment.CommentDtoIn;
import com.socialmedia.dto.comment.CommentDtoOut;
import com.socialmedia.mapper.CommentMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "api/v1/comments")
public class CommentController {

  private CommentMapper commentMapper;

  @Autowired
  public CommentController(CommentMapper commentMapper) {
    this.commentMapper = commentMapper;
  }

  @PostMapping("/post/{postId}")
  public ResponseEntity<CommentDtoOut> createComment(@PathVariable Long postId, @RequestBody CommentDtoIn comment) {
    CommentDtoOut commentDtoOut = commentMapper.createComment(postId, comment);
    return ResponseEntity.ok(commentDtoOut);
  }
}
