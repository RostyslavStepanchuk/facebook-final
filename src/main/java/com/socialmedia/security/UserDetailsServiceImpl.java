package com.socialmedia.security;

import com.socialmedia.model.ApplicationUser;
import com.socialmedia.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


import java.util.Collections;
import java.util.Optional;

@EnableWebSecurity
@Service("UserDetailsServiceImpl")
public class UserDetailsServiceImpl implements UserDetailsService {

  private UserRepository userRepository;

  @Autowired
  public UserDetailsServiceImpl(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Optional<ApplicationUser> user = userRepository.findById(username);
    return user
        .map(applicationUser -> new User(
            applicationUser.getUsername(),
            applicationUser.getPassword(),
            Collections.emptyList()))
        .orElseThrow(() -> new UsernameNotFoundException(username));
  }


}
