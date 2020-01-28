package com.socialmedia.interceptors;

import com.socialmedia.model.ApplicationUser;
import com.socialmedia.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.security.Principal;

@Component
@Slf4j
public class RequestHandlerInterceptor implements HandlerInterceptor {

    private UserService userService;

    @Autowired
    public RequestHandlerInterceptor(@Lazy UserService userService) {
        this.userService = userService;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse res, Object o) {
        //TODO add filter for null auth or anonymous user
        try {
            Principal principal = SecurityContextHolder.getContext().getAuthentication();
            ApplicationUser user = userService.getById(principal.getName());
            user.setLastActivityTime(System.currentTimeMillis());
            userService.update(user);
        } catch (Exception exc) {
            log.info(exc.getMessage());
        }
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) {

    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {

    }
}
