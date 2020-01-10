package com.socialmedia.service;

import com.socialmedia.dto.security.Token;
import com.socialmedia.dto.security.UserCredentials;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Service
public interface AuthenticationService {

  Token getAccessToken(UserCredentials credentials);

  Token getAccessToken(String username, String password);

  UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest req);

  Token getAccessTokenByRefreshToken(String refreshToken, String user);

  String generateRefreshToken(String username);

  void logOut(String username);
}
