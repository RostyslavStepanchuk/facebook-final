package com.socialmedia.service;

import com.socialmedia.controller.external.security.UserCredentials;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public interface AuthenticationService {

  Optional<String> getAccessToken(UserCredentials creds);
}
