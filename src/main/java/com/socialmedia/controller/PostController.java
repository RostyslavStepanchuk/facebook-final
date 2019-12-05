package com.socialmedia.controller;

import com.socialmedia.model.Post;
import com.socialmedia.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "api/v1/posts")
public class PostController implements ResponseEntityProvider {

  private PostService postService;

  @Autowired
  public PostController(PostService postService) {
    this.postService = postService;
  }

  //TODO remove endpoint, it's for testing purposes only
  @GetMapping
  public ResponseEntity<List<Post>> getAll() {
    return provideResponseForList(postService.findAll());
  }
}
