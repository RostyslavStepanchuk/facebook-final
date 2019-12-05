package com.socialmedia.repository;

import com.socialmedia.model.ApplicationUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<ApplicationUser, String> {
}
