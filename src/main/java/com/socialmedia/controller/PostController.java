package com.socialmedia.controller;

import com.socialmedia.dto.post.PostDtoOut;
import com.socialmedia.mapper.PostMapper;
import com.socialmedia.service.PostServiceDelete;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "api/v1/posts")
public class PostController implements ResponseEntityProvider {

  private PostServiceDelete postService;
  private PostMapper postMapper;

  @Autowired
  public PostController(PostServiceDelete postService, PostMapper postMapper) {
    this.postService = postService;
    this.postMapper = postMapper;
  }

  //TODO remove endpoint, it's for testing purposes only
  @GetMapping
  public ResponseEntity<List<PostDtoOut>> getAll() {
    List<PostDtoOut> posts = postService.findAll().stream()
        .map(postMapper::toDto)
        .collect(Collectors.toList());
    return provideResponseForList(posts);
  }
}
