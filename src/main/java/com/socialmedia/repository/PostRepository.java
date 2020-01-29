package com.socialmedia.repository;

import com.socialmedia.model.ApplicationUser;
import com.socialmedia.model.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

  List<Post> findAllByAuthorUsername(String id);

  List<Post> findAllByOwnerUsername(String id);

  @Query("SELECT p from Post p WHERE p.owner = :user or :user member p.taggedFriends")
  Page<Post> findAllByOwnerOrTag(ApplicationUser user, Pageable pageable);

  Page<Post> findAllByOwnerUsernameAndImageNotNull(String id, Pageable pageable);

  @Query("SELECT p from Post p WHERE p.owner.username in (:ids)")
  Page<Post> getAllByPostOwner(@Param("ids")List<String> ids, Pageable pageable);
}
