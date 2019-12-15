package com.socialmedia.service;

import com.socialmedia.model.EmailAddress;
import com.socialmedia.repository.EmailRepository;
import com.socialmedia.util.SmartCopyBeanUtilsBean;
import org.springframework.stereotype.Service;

@Service
public class EmailsService extends AbstractCrudService<EmailAddress, String, EmailRepository> {

  public EmailsService(EmailRepository jpaRepository,
                       SmartCopyBeanUtilsBean beanUtilsBean) {
    super(jpaRepository, beanUtilsBean);
  }
}
