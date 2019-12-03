package com.socialmedia.service;

import com.socialmedia.model.ApplicationUser;
import com.socialmedia.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

  private UserRepository userRepository;
  private BCryptPasswordEncoder bcryptPasswordEncoder;

  @Autowired
  public UserServiceImpl(UserRepository userRepository, BCryptPasswordEncoder bcryptPasswordEncoder) {
    this.userRepository = userRepository;
    this.bcryptPasswordEncoder = bcryptPasswordEncoder;
  }

  @Override
  public Optional<ApplicationUser> getUser(String username) {
    return userRepository.findById(username);
  }

  @Override
  public ApplicationUser addUser(ApplicationUser user) {

    user.setPassword(bcryptPasswordEncoder.encode(user.getPassword()));
    return userRepository.save(user);
  }


}
