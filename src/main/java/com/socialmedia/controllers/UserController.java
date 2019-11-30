package com.socialmedia.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/v1/users")
public class UserController {

  @GetMapping
  public ResponseEntity<String> getAll() {
    String response = "Hello from server";
    return ResponseEntity.ok(response);
  }

}
