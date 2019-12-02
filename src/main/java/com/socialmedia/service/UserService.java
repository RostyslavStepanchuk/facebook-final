package com.socialmedia.service;

import com.socialmedia.models.ApplicationUser;

import java.util.Optional;

public interface UserService {

  Optional<ApplicationUser> getCurrentUser();
  ApplicationUser signUp(ApplicationUser user);
}
