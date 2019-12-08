package com.socialmedia.service;

import com.socialmedia.model.ApplicationUser;

import java.lang.reflect.InvocationTargetException;
import java.util.Optional;

public interface UserService {

  ApplicationUser addUser(ApplicationUser user);

  Optional<ApplicationUser> getUser(String username);

  Optional<ApplicationUser> delete(String username);

  Optional<ApplicationUser> updateUser(String username,
                                       ApplicationUser toEntity)
      throws InvocationTargetException, IllegalAccessException;
}

