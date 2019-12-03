package com.socialmedia.security;

import com.socialmedia.service.AuthenticationService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.stereotype.Component;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

import static com.socialmedia.security.SecurityConstants.HEADER_STRING;
import static com.socialmedia.security.SecurityConstants.TOKEN_PREFIX;
import static com.socialmedia.security.SecurityConstants.SECRET;

@Component
public class JwtAuthenticationFilter extends BasicAuthenticationFilter {

  private AuthenticationService authenticationService;

  @Autowired
  public JwtAuthenticationFilter(AuthenticationManager authenticationManager, AuthenticationService authenticationService) {
    super(authenticationManager);
    this.authenticationService = authenticationService;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest req,
                                  HttpServletResponse res,
                                  FilterChain chain) throws IOException, ServletException {

    String header = req.getHeader(HEADER_STRING);

    if (validHeaderIsPresent(header)) {
      UsernamePasswordAuthenticationToken authentication = authenticationService.getAuthentication(req);
      SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    chain.doFilter(req, res);
  }

  private boolean validHeaderIsPresent(String header) {
    return header != null && header.startsWith(TOKEN_PREFIX);
  }


}
