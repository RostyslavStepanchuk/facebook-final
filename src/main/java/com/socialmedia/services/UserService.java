package com.socialmedia.services;

import com.socialmedia.models.User;

import java.util.Optional;

public interface UserService {

  Optional<User> getCurrentUser();
}
