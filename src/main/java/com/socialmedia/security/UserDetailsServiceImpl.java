package com.socialmedia.security;

import com.socialmedia.models.ApplicationUser;
import com.socialmedia.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Collections;
import java.util.Optional;
import java.util.function.Function;
import java.util.function.Supplier;

@EnableWebSecurity
public class UserDetailsServiceImpl implements UserDetailsService {

  private UserRepository userRepository;

  @Autowired
  public UserDetailsServiceImpl(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Optional<ApplicationUser> user = userRepository.findByUsername(username);
    return user
        .map(applicationUser -> new User(
            applicationUser.getUsername(),
            applicationUser.getPassword(),
            Collections.emptyList()))
        .orElseThrow(() -> new UsernameNotFoundException(username));
  }


}
