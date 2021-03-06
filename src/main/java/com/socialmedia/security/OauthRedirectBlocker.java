package com.socialmedia.security;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static com.socialmedia.security.SecurityConstants.GOOGLE_AUTH_URL;

@Component
public class OauthRedirectBlocker implements AuthenticationEntryPoint {

  @Override
  public void commence(HttpServletRequest httpServletRequest,
                       HttpServletResponse httpServletResponse,
                       AuthenticationException exception) throws IOException, ServletException {
    if (httpServletRequest.getRequestURI().contains(GOOGLE_AUTH_URL)) {
      httpServletResponse.sendRedirect("/oauth2/authorization/google");
    } else {
      httpServletResponse.setStatus(403);
    }
  }
}

