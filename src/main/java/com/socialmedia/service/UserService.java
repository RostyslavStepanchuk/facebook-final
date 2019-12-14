package com.socialmedia.service;

import com.socialmedia.exception.NoDataFoundException;
import com.socialmedia.model.ApplicationUser;
import com.socialmedia.repository.UserRepository;
import com.socialmedia.util.SmartCopyBeanUtilsBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public final class UserService extends AbstractCrudService<ApplicationUser, String, UserRepository> {

  private BCryptPasswordEncoder bcryptPasswordEncoder;

  @Autowired
  public UserService(UserRepository jpaRepository,
                     SmartCopyBeanUtilsBean beanUtilBean,
                     BCryptPasswordEncoder bcryptPasswordEncoder) {
    super(jpaRepository, beanUtilBean);
    this.bcryptPasswordEncoder = bcryptPasswordEncoder;
  }

  @Override
  public ApplicationUser update(String username, ApplicationUser incomingEntity) {

    Optional<ApplicationUser> existingEntity = jpaRepository.findById(username);

    existingEntity.ifPresent(user -> {
      try {
        beanUtilsBean.copyProperties(user, incomingEntity);
        jpaRepository.save(user);
        if (!username.equals(incomingEntity.getUsername())) {
          // if user changed username entity with old username should be removed
          jpaRepository.deleteById(incomingEntity.getUsername());
        }
      } catch (ReflectiveOperationException reflectionException) {
        throw new RuntimeException(reflectionException.getMessage());
      }
    });

    return resolvedOptional(existingEntity, username);
  }

  @Override
  public List<ApplicationUser> getAll() {
    return jpaRepository.findAll();
  }

  @Override
  public ApplicationUser create(ApplicationUser user) {
    if (jpaRepository.findById(user.getUsername()).isPresent()) {
      throw new BadCredentialsException(String.format("User with username %s already exists", user.getUsername()));
    }
    user.setPassword(bcryptPasswordEncoder.encode(user.getPassword()));
    return jpaRepository.save(user);
  }

  private ApplicationUser resolvedOptional(Optional<ApplicationUser> user, String username) {
    return user.orElseThrow(()->new NoDataFoundException(
        String.format("%s with id %s wasn't found", user.getClass().getSimpleName(), username)));
  }

}
