package com.socialmedia.controller;

import com.socialmedia.dto.post.PostDtoIn;
import com.socialmedia.dto.post.PostDtoOut;
import com.socialmedia.mapper.PostMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/v1/posts")
public class PostController {

  private PostMapper postMapper;

  @Autowired
  public PostController(PostMapper postMapper) {
    this.postMapper = postMapper;
  }

  //TODO remove endpoint, it's for testing purposes only
  @GetMapping
  public ResponseEntity<List<PostDtoOut>> getAll() {

    return ResponseEntity.ok(postMapper.getAll());
  }

  @PostMapping
  public ResponseEntity<PostDtoOut> create(@RequestBody PostDtoIn post) {
    PostDtoOut postDtoOut = postMapper.create(post);
    return ResponseEntity.ok(postDtoOut);
  }
}
