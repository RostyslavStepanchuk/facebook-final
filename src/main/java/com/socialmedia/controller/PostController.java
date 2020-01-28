package com.socialmedia.controller;

import com.socialmedia.dto.comment.CommentDtoIn;
import com.socialmedia.dto.image.ImageDtoOut;
import com.socialmedia.dto.post.PostDtoIn;
import com.socialmedia.dto.post.PostDtoOut;
import com.socialmedia.mapper.PostMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
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

  @GetMapping
  public ResponseEntity<List<PostDtoOut>> getAllPostsForFeed(
      @PageableDefault(sort = { "id" }, direction = Sort.Direction.DESC) Pageable pageable) {
    return ResponseEntity.ok(postMapper.getAllPostsForFeed(pageable));
  }

  @GetMapping("/profile")
  public ResponseEntity<List<PostDtoOut>> getAllOwnPosts(
      @PageableDefault(sort = { "id" }, direction = Sort.Direction.DESC) Pageable pageable) {
    return ResponseEntity.ok(postMapper.getAllUsersPosts(pageable));
  }

  @GetMapping("/profile/{feedOwner}")
  public ResponseEntity<List<PostDtoOut>> getAllUserPosts(
      @PathVariable String feedOwner,
      @PageableDefault(sort = { "id" }, direction = Sort.Direction.DESC) Pageable pageable) {
    return ResponseEntity.ok(postMapper.getAllUsersPosts(feedOwner, pageable));
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

  @Transactional
  @DeleteMapping("/{id}")
  public ResponseEntity<PostDtoOut> delete(@PathVariable Long id) {
    PostDtoOut postDtoOut = postMapper.delete(id);
    return ResponseEntity.ok(postDtoOut);
  }

  @PutMapping("/{postId}/like")
  public ResponseEntity<PostDtoOut> updateLikes(@PathVariable Long postId) {
    return ResponseEntity.ok(postMapper.updateLikes(postId));
  }

  @PostMapping("/{postId}/comment")
  public ResponseEntity<PostDtoOut> createComment(@PathVariable Long postId,
                                                  @RequestBody CommentDtoIn commentDtoIn) {
    return ResponseEntity.ok(postMapper.createComment(postId, commentDtoIn));
  }

  @DeleteMapping("/{postId}/comment/{commentId}")
  public ResponseEntity<PostDtoOut> deleteComment(@PathVariable Long postId,
                                                  @PathVariable Long commentId) {
    return ResponseEntity.ok(postMapper.deleteComment(postId, commentId));
  }

  @GetMapping("/photos/{userId}")
  public ResponseEntity<List<ImageDtoOut>> getUserPhotosFromPosts(@PathVariable(required = false) String userId,
      @PageableDefault(sort = { "id" }, direction = Sort.Direction.DESC) Pageable pageable) {
    return ResponseEntity.ok(postMapper.getUserPhotosFromPosts(userId, pageable));
  }
}
