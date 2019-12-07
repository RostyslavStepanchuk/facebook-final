package com.socialmedia.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import static org.springframework.http.HttpStatus.BAD_REQUEST;
import static org.springframework.http.HttpStatus.CONFLICT;

@ControllerAdvice
public class ExceptionController {

  @ExceptionHandler(Throwable.class)
  public ResponseEntity<String> globalHandler(Exception error) {
    return new ResponseEntity<>(error.getMessage(), CONFLICT);
  }

  @ExceptionHandler(BadCredentialsException.class)
  public ResponseEntity<String> badCredentialsHandler(BadCredentialsException error) {
    return new ResponseEntity<>(error.getMessage(), BAD_REQUEST);
  }
}
