package com.socialmedia.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import static org.springframework.http.HttpStatus.CONFLICT;

@ControllerAdvice
public class ExceptionController {

  @ExceptionHandler(Throwable.class)
  public ResponseEntity<String> globalHandler(Exception e) {
    return new ResponseEntity<>(e.getMessage(), CONFLICT);
  }
}
