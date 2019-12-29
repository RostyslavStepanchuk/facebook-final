package com.socialmedia.repository;

import com.socialmedia.model.ApplicationUser;
import com.socialmedia.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

   List<Post> findAllByAuthor_Id(String id);
}
