package com.socialmedia.service;

import com.socialmedia.models.ApplicationUser;
import com.socialmedia.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

  private UserRepository userRepository;

  @Autowired
  public UserServiceImpl(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public Optional<ApplicationUser> getCurrentUser() {
    // TODO this is a draft method just to get some user returned
    return Optional.of(userRepository.findAll().get(0));
  }

  @Override
  public ApplicationUser signUp(ApplicationUser user) {
    return userRepository.save(user);
  }
}
