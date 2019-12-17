package com.socialmedia.service;


import com.socialmedia.dto.security.Token;
import com.socialmedia.dto.security.UserCredentials;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;

import static com.socialmedia.security.SecurityConstants.HEADER_STRING;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

  @Value("${spring.security.jwt-secret}")
  public String secret;

  private AuthenticationManager authenticationManager;

  @Autowired
  public AuthenticationServiceImpl(AuthenticationManager authenticationManager) {
    this.authenticationManager = authenticationManager;
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
      String token = Jwts.builder()
          .setIssuedAt(new Date())
          .setExpiration(new Date(System.currentTimeMillis() + (1000 * 60 * 15)))
          .setSubject(authResult.getName())
          .addClaims(Collections.emptyMap())
          .signWith(SignatureAlgorithm.HS512, secret)
          .compact();
      return new Token(token);
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
}
