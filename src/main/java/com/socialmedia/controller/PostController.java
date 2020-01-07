package com.socialmedia.controller;

import com.socialmedia.dto.post.PostDtoIn;
import com.socialmedia.dto.post.PostDtoOut;
import com.socialmedia.mapper.PostMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "api/v1/posts")
public class PostController {

  private PostMapper postMapper;

  @Autowired
  public PostController(PostMapper postMapper) {
    this.postMapper = postMapper;
  }

  @GetMapping
  public ResponseEntity<List<PostDtoOut>> getAllPostsForFeed() {
    return ResponseEntity.ok(postMapper.getAllPostsForFeed());
  }

  @GetMapping("/profile")
  public ResponseEntity<List<PostDtoOut>> getAllOwnPosts() {
    return ResponseEntity.ok(postMapper.getAllUsersPosts());
  }

  @GetMapping("/profile/{feedOwner}")
  public ResponseEntity<List<PostDtoOut>> getAllUserPost(@PathVariable String feedOwner) {
    return ResponseEntity.ok(postMapper.getAllUsersPosts(feedOwner));
  }

  @GetMapping("/{id}")
  public ResponseEntity<PostDtoOut> getPostById(@PathVariable Long id) {
    PostDtoOut postDtoOut = postMapper.getById(id);
    return ResponseEntity.ok(postDtoOut);
  }

  @PostMapping("/profile")
  public ResponseEntity<PostDtoOut> createPostInProfile(@RequestBody PostDtoIn post) {
    PostDtoOut postDtoOut = postMapper.create(post);
    return ResponseEntity.ok(postDtoOut);
  }

  @PostMapping("/{feedOwner}")
  public ResponseEntity<PostDtoOut> createPostInOtherFeed(@RequestBody PostDtoIn post, @PathVariable String feedOwner) {
    PostDtoOut postDtoOut = postMapper.createPostInOtherFeed(post, feedOwner);
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
