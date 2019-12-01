package com.socialmedia.services;

import com.socialmedia.models.User;
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
  public Optional<User> getCurrentUser() {
    // TODO this is a draft method just to get some user returned
    return Optional.of(userRepository.findAll().get(0));
  }
}
