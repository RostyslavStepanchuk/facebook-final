package com.socialmedia.repository;

import com.socialmedia.model.ApplicationUser;
import com.socialmedia.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<ApplicationUser, String> {
  @Query("SELECT u from ApplicationUser u WHERE u.tokensData.emailConfirmationId = :confirmationId")
  Optional<ApplicationUser> getByEmailConfirmationId(@Param("confirmationId") String emailConfirmationId);

  ApplicationUser getByTokensData_ForgotPasswordToken(String forgotPasswordToken);

  Optional<ApplicationUser> findByEmail(String email);

  @Query("select u from ApplicationUser u where lower(u.firstName) like %:queryStr% "
      + "or lower(u.lastName) like %:queryStr%  ")
  List<ApplicationUser> findAllByFirstOrLastName(String queryStr);
}