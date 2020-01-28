package com.socialmedia.repository;

import com.socialmedia.model.ApplicationUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

  @Query("SELECT u.friends FROM ApplicationUser u WHERE u.username = :username")
  Page<ApplicationUser> getAllUserFriends(String username, Pageable pageable);

  @Query("select u from ApplicationUser u where lower(u.firstName) like %:queryStr% "
      + "or lower(u.lastName) like %:queryStr%  ")
  List<ApplicationUser> findAllByFirstOrLastName(String queryStr);

  @Query("SELECT u from ApplicationUser u where u.username in (:ids)")
  List<ApplicationUser> getAllUsersFromList(@Param("ids")List<String> ids);
}