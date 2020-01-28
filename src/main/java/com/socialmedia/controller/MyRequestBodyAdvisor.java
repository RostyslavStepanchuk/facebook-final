package com.socialmedia.controller;

import com.socialmedia.model.ApplicationUser;
import com.socialmedia.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.MethodParameter;
import org.springframework.http.HttpInputMessage;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.RequestBodyAdviceAdapter;

import java.lang.reflect.Type;
import java.security.Principal;

@ControllerAdvice
public class MyRequestBodyAdvisor extends RequestBodyAdviceAdapter {

  private UserService userService;

  @Autowired
  public MyRequestBodyAdvisor(UserService userService) {
    this.userService = userService;
  }

  @Override
  public boolean supports(MethodParameter methodParameter, Type targetType, Class<? extends HttpMessageConverter<?>> converterType) {
    //targetType.getTypeName().equals(ApplicationUser.class.getTypeName());
    //methodParameter.getContainingClass().equals(UserController.class);
    return methodParameter.getContainingClass().equals(UserController.class)
            || methodParameter.getContainingClass().equals(PostController.class);
  }

  @Override
  public Object afterBodyRead(Object body, HttpInputMessage inputMessage, MethodParameter parameter, Type targetType, Class<? extends HttpMessageConverter<?>> converterType) {
    Principal principal = SecurityContextHolder.getContext().getAuthentication();
    ApplicationUser user = userService.getById(principal.getName());
    user.setLastActivityTime(System.currentTimeMillis());
    user.setFirstName("MyRequestBodyAdvisor");
    userService.update(user);

    return super.afterBodyRead(body, inputMessage, parameter, targetType, converterType);
  }
}
