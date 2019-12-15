package com.socialmedia.repository;

import com.socialmedia.model.EmailAddress;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmailRepository extends JpaRepository <EmailAddress, String> {
}
