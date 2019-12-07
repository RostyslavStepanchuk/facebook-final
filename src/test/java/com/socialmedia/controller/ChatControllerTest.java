package com.socialmedia.controller;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static com.socialmedia.controller.util.TestConstants.URL_GET_ALL_CHATS;
import static com.socialmedia.controller.util.TestConstants.USER_USERNAME;
import static org.hamcrest.collection.IsIterableWithSize.iterableWithSize;
import static org.hamcrest.number.OrderingComparison.greaterThan;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
public class ChatControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @Test
  @WithMockUser(username = USER_USERNAME)
  public void getAllShouldReturnAllChats() throws Exception{
    mockMvc.perform(get(URL_GET_ALL_CHATS))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$[*].name").isNotEmpty())
        .andExpect(jsonPath("$[*].participants[*]", iterableWithSize(greaterThan(1))))
        .andExpect(jsonPath("$[*].participants[*].username").isNotEmpty())
        .andExpect(jsonPath("$[*].messages[*].text").isNotEmpty())
        .andExpect(jsonPath("$[*].messages[*].date").isNotEmpty())
        .andExpect(jsonPath("$[*].messages[*].author.username").isNotEmpty());
  }
}