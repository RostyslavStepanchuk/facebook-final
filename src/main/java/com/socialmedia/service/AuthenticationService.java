package com.socialmedia.service;

import com.socialmedia.controller.external.security.UserCredentials;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

@Service
public interface AuthenticationService {

  Optional<String> getAccessToken(UserCredentials credentials);

  UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest req);
}
