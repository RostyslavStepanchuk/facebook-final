package com.socialmedia.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.socialmedia.dto.security.UserCredentials;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;


import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
public class AuthenticationControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper mapper;

  @Test
  public void accessTokenWithValidCredentialsShouldReturnToken() throws Exception {

    UserCredentials credentials = new UserCredentials("testUser", "passw1234");
    RequestBuilder requestBuilder = post("/api/v1/auth/access-token")
        .content(mapper.writeValueAsString(credentials))
        .contentType("application/json");

    mockMvc.perform(requestBuilder)
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.accessToken").exists());
  }

  @Test
  public void accessTokenWithInvalidCredentialsShouldReturnError() throws Exception {

    UserCredentials credentials = new UserCredentials("testUser", "wrongpassword");
    RequestBuilder requestBuilder = post("/api/v1/auth/access-token")
        .content(mapper.writeValueAsString(credentials))
        .contentType("application/json");

    mockMvc.perform(requestBuilder)
        .andExpect(status().isForbidden());
  }
}