package com.socialmedia.repository;

import com.socialmedia.model.ApplicationUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<ApplicationUser, String> {
  Optional<ApplicationUser> findByUsername(String  username);
}
