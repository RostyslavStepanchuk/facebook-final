package com.socialmedia.service;

import com.socialmedia.dto.security.UserCredentials;
import com.socialmedia.model.ApplicationUser;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Service
public interface AuthenticationService {

  String getAccessToken(UserCredentials credentials);

  String getAccessToken(String username, String password);

  UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest req);

  String getAccessTokenByRefreshToken(String refreshToken, String user);

  String generateRefreshToken(String username);

  void logOut(String username);

  String generateForgotPasswordToken(ApplicationUser user);

  String generateTokenForOauthUser(String email);

}
