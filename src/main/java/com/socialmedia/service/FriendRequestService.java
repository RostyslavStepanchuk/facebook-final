package com.socialmedia.service;

import com.socialmedia.model.ApplicationUser;
import com.socialmedia.model.FriendRequest;
import com.socialmedia.repository.FriendRequestRepository;
import com.socialmedia.util.SmartCopyBeanUtilsBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FriendRequestService extends AbstractCrudService<FriendRequest, Long, FriendRequestRepository> {

  @Autowired
  public FriendRequestService(FriendRequestRepository jpaRepository,
                              SmartCopyBeanUtilsBean beanUtilsBean) {
    super(jpaRepository, beanUtilsBean);
  }

  public List<FriendRequest> getAllByResponder(ApplicationUser user) {
    return jpaRepository.getAllByResponder(user);
  }

  public List<FriendRequest> getAllByRequester(ApplicationUser user) {
    return jpaRepository.getAllByRequester(user);
  }
}
