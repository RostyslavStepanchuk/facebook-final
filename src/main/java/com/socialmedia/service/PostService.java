package com.socialmedia.service;

import com.socialmedia.model.ApplicationUser;
import com.socialmedia.model.Post;
import com.socialmedia.repository.PostRepository;
import com.socialmedia.util.SmartCopyBeanUtilsBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public final class PostService extends AbstractCrudService<Post, Long, PostRepository> {

  @Autowired
  public PostService(PostRepository jpaRepository, SmartCopyBeanUtilsBean beanUtilsBean) {
    super(jpaRepository, beanUtilsBean);
  }

  @Override
  public Post create(Post entity) {
    entity.setDate(new Date().getTime());
    return super.create(entity);
  }

  @Override
  public Post delete(Long id) throws Exception {
    Principal principal = SecurityContextHolder.getContext().getAuthentication();
    Optional<Post> existingEntity = jpaRepository.findById(id);
    Post post = existingEntity.orElseThrow(() -> new Exception("Not found"));

    if (principal.getName().equals(post.getAuthor().getUsername())) {
      return super.delete(id);
    } else {
      throw new Exception("Bad credentials");
    }
  }

  public List<Post> findAllUsersPosts() {
    Principal principal = SecurityContextHolder.getContext().getAuthentication();

    return jpaRepository.findAllByAuthor_Id(principal.getName());
  }
}
