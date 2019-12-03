package com.socialmedia.service;

import com.socialmedia.model.ApplicationUser;

import java.util.Optional;

public interface UserService {

  ApplicationUser addUser(ApplicationUser user);

  Optional<ApplicationUser> getUser(String username);
}
