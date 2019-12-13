package com.socialmedia.service;

import com.socialmedia.model.Post;
import com.socialmedia.repository.PostRepository;
import com.socialmedia.util.SmartCopyBeanUtilsBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public final class PostService extends AbstractCrudService<Post, Long, PostRepository> {

  @Autowired
  public PostService(PostRepository jpaRepository, SmartCopyBeanUtilsBean beanUtilsBean) {
    super(jpaRepository, beanUtilsBean);
  }
}
