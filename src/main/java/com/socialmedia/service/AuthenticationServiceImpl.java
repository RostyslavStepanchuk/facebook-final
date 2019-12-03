package com.socialmedia.service;


import com.socialmedia.controller.external.security.UserCredentials;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.Optional;

import static com.socialmedia.security.SecurityConstants.SECRET;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

  private AuthenticationManager authenticationManager;

  @Autowired
  public AuthenticationServiceImpl(AuthenticationManager authenticationManager) {
    this.authenticationManager = authenticationManager;
  }

  @Override
  public Optional<String> getAccessToken(UserCredentials credentials) {

    Authentication authResult = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(
        credentials.getUsername(),
        credentials.getPassword(),
        new ArrayList<>())
    );

    if (authResult.isAuthenticated()) {
      String token = Jwts.builder()
          .setIssuedAt(new Date())
          .setExpiration(new Date(System.currentTimeMillis() + (1000 * 60 * 15)))
          .setSubject(authResult.getName())
          .addClaims(Collections.emptyMap())
          .signWith(SignatureAlgorithm.HS512, SECRET)
          .compact();
      return Optional.of(token);
    }

    return Optional.empty();
  }
}
