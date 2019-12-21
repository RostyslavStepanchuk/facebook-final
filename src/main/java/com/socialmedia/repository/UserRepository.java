package com.socialmedia.repository;

import com.socialmedia.model.ApplicationUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<ApplicationUser, String> {
  @Query("SELECT u from ApplicationUser u WHERE u.tokensData.emailConfirmationId = :confirmationId")
  Optional<ApplicationUser> getByEmailConfirmationId(@Param("confirmationId") String emailConfirmationId);
}
