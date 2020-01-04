package com.socialmedia.service;

import com.socialmedia.dto.security.Token;
import com.socialmedia.dto.security.UserCredentials;
import com.socialmedia.model.ApplicationUser;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Service
public interface AuthenticationService {

  Token getAccessToken(UserCredentials credentials);

  Token getAccessToken(String username, String password);

  UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest req);

  Token refreshTokens(String refreshToken, ApplicationUser user, HttpServletResponse resp);
}
