package com.socialmedia.service;

import com.socialmedia.model.ApplicationUser;
import com.socialmedia.model.Comment;
import com.socialmedia.model.Post;
import com.socialmedia.repository.CommentRepository;
import com.socialmedia.util.SmartCopyBeanUtilsBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service
public class CommentService extends AbstractCrudService<Comment, Long, CommentRepository>  {

    private PostService postService;
    private UserService userService;

    @Autowired
    public CommentService(CommentRepository jpaRepository,
                          SmartCopyBeanUtilsBean beanUtilsBean,
                          @Lazy PostService postService,
                          @Lazy UserService userService) {
        super(jpaRepository, beanUtilsBean);
        this.postService = postService;
        this.userService = userService;
    }

    public Comment createComment(Comment comment, Long postId) {
        Principal principal = SecurityContextHolder.getContext().getAuthentication();
        ApplicationUser author = userService.getById(principal.getName());
        Post post = postService.getById(postId);
        comment.setDate(System.currentTimeMillis());
        comment.setAuthor(author);
        comment.setPost(post);
        return super.create(comment);
    }

}
