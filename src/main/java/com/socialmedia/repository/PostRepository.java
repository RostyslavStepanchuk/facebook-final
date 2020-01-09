package com.socialmedia.repository;

import com.socialmedia.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

  List<Post> findAllByOwner_Username(String id);
}
