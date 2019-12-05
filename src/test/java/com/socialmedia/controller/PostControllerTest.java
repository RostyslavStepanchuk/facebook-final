package com.socialmedia.controller;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
public class PostControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @Test
  @WithMockUser(username = "testUser")
  public void getAllShouldReturnAllPosts() throws Exception{

    mockMvc.perform(get("/api/v1/posts"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$[*].message").exists())
        .andExpect(jsonPath("$[*].date").isNotEmpty())
        .andExpect(jsonPath("$[*].image").exists())
        .andExpect(jsonPath("$[*].showEveryone").isNotEmpty())
        .andExpect(jsonPath("$[*].author.username").isNotEmpty())
        .andExpect(jsonPath("$[*].receivedComments[*].message").isNotEmpty())
        .andExpect(jsonPath("$[*].receivedComments[*].date").isNotEmpty())
        .andExpect(jsonPath("$[*].receivedComments[*].author.username").isNotEmpty())
        .andExpect(jsonPath("$[*].receivedComments[*].author.username").isNotEmpty())
        .andExpect(jsonPath("$[*].likes[*].username").isNotEmpty());

  }

}