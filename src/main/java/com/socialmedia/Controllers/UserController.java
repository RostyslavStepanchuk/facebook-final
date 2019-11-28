package com.socialmedia.Controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value= "/users")
public class UserController {

    @RequestMapping
    public ResponseEntity<String> getAll(){
        String response = "Hello from server";
        return ResponseEntity.ok(response);
    }
}
