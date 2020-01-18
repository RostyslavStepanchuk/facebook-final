package com.socialmedia.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
public class EmailHandler {

  private static final String SIGN_UP_LETTER_SUBJECT = "New account registered on DANBook";
  private static final String SIGN_UP_LETTER_BODY = "Please follow this link to finish your registration %s";
  private static final String SIGN_UP_CONFIRMATION_URL = "http://localhost:3000/email/confirm/";
  private static final String CHANGE_PASSWORD_LETTER_SUBJECT = "Password reset on DANBook";
  private static final String CHANGE_PASSWORD_LETTER_BODY = "To reset your password, please follow this link:"
      + " \n%s \n\n "
      + "This link is valid for half an hour\n\n"
      + " If you didn't request password change just ignore this letter";
  private static final String CHANGE_PASSWORD_URL = "http://localhost:3000/change_password/";


  private JavaMailSender emailSender;

  @Autowired
  public EmailHandler(JavaMailSender emailSender) {
    this.emailSender = emailSender;
  }

  @Async
  public void sendEmailConfirmationLetter(String to, String token) {

    SimpleMailMessage message = prepareBasics(to, SIGN_UP_LETTER_SUBJECT);
    message.setText(String.format(SIGN_UP_LETTER_BODY, SIGN_UP_CONFIRMATION_URL + token));
    emailSender.send(message);
  }

  @Async
  public void sendResetPasswordLetter(String to, String token) {

    SimpleMailMessage message = prepareBasics(to, CHANGE_PASSWORD_LETTER_SUBJECT);
    message.setText(String.format(CHANGE_PASSWORD_LETTER_BODY, CHANGE_PASSWORD_URL + token));
    emailSender.send(message);
  }

  private SimpleMailMessage prepareBasics(String to, String subject) {

    SimpleMailMessage message = new SimpleMailMessage();
    message.setTo(to);
    message.setSubject(subject);
    return message;
  }
}
