package com.socialmedia.service;

import com.socialmedia.model.ApplicationUser;
import com.socialmedia.repository.UserRepository;
import com.socialmedia.util.SmartCopyBeanUtilsBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.lang.reflect.InvocationTargetException;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

  private UserRepository userRepository;
  private BCryptPasswordEncoder bcryptPasswordEncoder;
  private SmartCopyBeanUtilsBean smartCopyBeanUtilsBean;

  @Autowired
  public UserServiceImpl(UserRepository userRepository,
                         BCryptPasswordEncoder bcryptPasswordEncoder,
                         SmartCopyBeanUtilsBean smartCopyBeanUtilsBean) {
    this.userRepository = userRepository;
    this.bcryptPasswordEncoder = bcryptPasswordEncoder;
    this.smartCopyBeanUtilsBean = smartCopyBeanUtilsBean;
  }

  @Override
  public Optional<ApplicationUser> getUser(String username) {
    return userRepository.findById(username);
  }


  @Override
  public Optional<ApplicationUser> delete(String username) {

    Optional<ApplicationUser> user = userRepository.findById(username);
    user.ifPresent(userRepository::delete);
    return user;
  }

  @Override
  public Optional<ApplicationUser> updateUser(String username,
                                              ApplicationUser incomingEntity)
      throws InvocationTargetException, IllegalAccessException {

    Optional<ApplicationUser> existingEntity = userRepository.findById(username);
    if (existingEntity.isPresent()) {
      ApplicationUser user = existingEntity.get();
      smartCopyBeanUtilsBean.copyProperties(user, incomingEntity);
      userRepository.save(user);
    }
    return existingEntity;
  }

  @Override
  public ApplicationUser addUser(ApplicationUser user) {

    user.setPassword(bcryptPasswordEncoder.encode(user.getPassword()));
    return userRepository.save(user);
  }


}
