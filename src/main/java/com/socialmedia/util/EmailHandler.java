package com.socialmedia.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
public class EmailHandler {

  private static final String SIGN_UP_LETTER_SUBJECT = "New account registered on Facebook final";
  private static final String SIGN_UP_LETTER_BODY = "Please follow this link to finish your registration %s";
  private static final String SIGN_UP_CONFIRMATION_URL = "http://localhost:3000/confirm_email/";

  private JavaMailSender emailSender;

  @Autowired
  public EmailHandler(JavaMailSender emailSender) {
    this.emailSender = emailSender;
  }

  public void sendEmailConfirmationLetter(
      String to, String token) {
    SimpleMailMessage message = new SimpleMailMessage();
    message.setTo(to);
    message.setSubject(SIGN_UP_LETTER_SUBJECT);
    message.setText(String.format(SIGN_UP_LETTER_BODY, SIGN_UP_CONFIRMATION_URL + to + "/" + token));
    emailSender.send(message);
  }
}
