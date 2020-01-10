package com.socialmedia.service;


import com.socialmedia.dto.security.Token;
import com.socialmedia.dto.security.UserCredentials;
import com.socialmedia.model.ApplicationUser;
import com.socialmedia.model.TokensData;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.UUID;

import static com.socialmedia.security.SecurityConstants.ACCESS_TOKEN_MAX_AGE;
import static com.socialmedia.security.SecurityConstants.HEADER_STRING;
import static com.socialmedia.security.SecurityConstants.REFRESH_TOKEN_MAX_AGE;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

  @Value("${spring.security.jwt-secret}")
  public String secret;

  private AuthenticationManager authenticationManager;
  private UserService userService;

  @Autowired
  public AuthenticationServiceImpl(AuthenticationManager authenticationManager, @Lazy UserService userService) {
    this.authenticationManager = authenticationManager;
    this.userService = userService;
  }

  @Override
  public Token getAccessToken(UserCredentials credentials) {

    return getAccessToken(credentials.getUsername(), credentials.getPassword());
  }

  @Override
  public Token getAccessToken(String username, String password) {

    Authentication authResult = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
            username,
            password,
            new ArrayList<>())
    );

    if (authResult.isAuthenticated()) {
      return generateAccessToken(authResult.getName());
    }

    throw new BadCredentialsException("Unable to authenticate user");
  }

  public UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest req) {

    String token = req.getHeader(HEADER_STRING);
    UsernamePasswordAuthenticationToken result = null;
    if (token != null) {
      Claims claims = Jwts.parser()
          .setSigningKey(secret)
          .parseClaimsJws(token.replace("Bearer", ""))
          .getBody();
      result = new UsernamePasswordAuthenticationToken(claims.getSubject(), null, Collections.emptyList());
    }
    return result;
  }

  @Override
  public Token getAccessTokenByRefreshToken(String refreshToken, String username) {

    ApplicationUser user = userService.getById(username);
    String userRefreshToken = user.getTokensData().getRefreshToken();
    Date tokenExpiration = new Date(user.getTokensData().getRefreshTokenValidTill());

    if (userRefreshToken.equals(refreshToken)
        & tokenExpiration.after(new Date())) {
      return generateAccessToken(user.getUsername());
    }

    throw new BadCredentialsException("Access to application have expired, please log in");
  }

  @Override
  public String generateRefreshToken(String username) {

    ApplicationUser user = userService.getById(username);
    String refreshToken = UUID.randomUUID().toString();
    TokensData tokensData = user.getTokensData();
    tokensData.setRefreshToken(refreshToken);
    tokensData.setRefreshTokenValidTill(System.currentTimeMillis() + REFRESH_TOKEN_MAX_AGE);
    userService.update(user.getUsername(), user);
    return refreshToken;
  }

  @Override
  public void logOut(String username) {
    ApplicationUser user = userService.getById(username);
    user.getTokensData().setRefreshTokenValidTill(0L);
    user.getTokensData().setRefreshToken(null);
  }

  private Token generateAccessToken(String subject) {

    String token = Jwts.builder()
        .setIssuedAt(new Date())
        .setExpiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_MAX_AGE))
        .setSubject(subject)
        .addClaims(Collections.emptyMap())
        .signWith(SignatureAlgorithm.HS512, secret)
        .compact();
    return new Token(token);
  }
}
