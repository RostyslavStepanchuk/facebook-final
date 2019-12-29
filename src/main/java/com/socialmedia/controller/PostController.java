package com.socialmedia.controller;

import com.socialmedia.dto.post.PostDtoIn;
import com.socialmedia.dto.post.PostDtoOut;
import com.socialmedia.mapper.PostMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
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
  public ResponseEntity<List<PostDtoOut>> getAllUsersPosts() {

    return ResponseEntity.ok(postMapper.getAllUsersPosts());
  }

  @PostMapping
  public ResponseEntity<PostDtoOut> create(@RequestBody PostDtoIn post) {
    PostDtoOut postDtoOut = postMapper.create(post);
    return ResponseEntity.ok(postDtoOut);
  }

  @GetMapping("/{id}")
  public ResponseEntity<PostDtoOut> getPostById(@PathVariable Long id) {
    PostDtoOut postDtoOut = postMapper.getById(id);
    return ResponseEntity.ok(postDtoOut);
  }

  @PutMapping("/{id}")
  public ResponseEntity<PostDtoOut> update(@PathVariable Long id, @RequestBody PostDtoIn post) {
    PostDtoOut postDtoOut = postMapper.update(id, post);
    return ResponseEntity.ok(postDtoOut);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<PostDtoOut> delete(@PathVariable Long id) throws Exception {
    PostDtoOut postDtoOut = postMapper.delete(id);
    return ResponseEntity.ok(postDtoOut);
  }
}
