package com.socialmedia.controller;


import com.socialmedia.dto.security.Token;
import com.socialmedia.dto.security.UserCredentials;
import com.socialmedia.mapper.AuthenticationMapper;
import com.socialmedia.util.CookieMgr;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

import static com.socialmedia.security.SecurityConstants.REFRESH_TOKEN_COOKIE_NAME;

@RestController
@RequestMapping(value = "/api/v1/auth")
public class AuthenticationController {

  private AuthenticationMapper authenticationMapper;
  private CookieMgr cookieMgr;

  @Autowired
  public AuthenticationController(AuthenticationMapper authenticationMapper, CookieMgr cookieMgr) {
    this.authenticationMapper = authenticationMapper;
    this.cookieMgr = cookieMgr;
  }

  @PostMapping("/access-token")
  public ResponseEntity<Token> getAccessJwt(@RequestBody UserCredentials credentials, HttpServletResponse resp) {

    Token token = authenticationMapper.getAccessToken(credentials);
    String newRefreshToken = authenticationMapper.generateRefreshToken(credentials.getUsername());
    cookieMgr.addRefreshTokenCookie(resp, newRefreshToken);

    return ResponseEntity.ok(token);
  }

  @PostMapping("/refresh-tokens/{username}")
  public ResponseEntity<Token> refreshAccessJwt(@PathVariable String username,
                                                @CookieValue(REFRESH_TOKEN_COOKIE_NAME) String refreshToken,
                                                HttpServletResponse resp) {

    Token token = authenticationMapper.getAccessTokenByRefreshToken(refreshToken, username);
    String newRefreshToken = authenticationMapper.generateRefreshToken(username);
    cookieMgr.addRefreshTokenCookie(resp, newRefreshToken);

    return ResponseEntity.ok(token);
  }

}
