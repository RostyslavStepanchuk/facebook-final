package com.socialmedia.controller;

import com.socialmedia.service.UserService;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import static com.socialmedia.controller.util.TestConstants.URL_GET_CURRENT_USER;
import static com.socialmedia.controller.util.TestConstants.USER_USERNAME;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
class ExceptionControllerTest {

  @Autowired
  private MockMvc mockMvc;

  @MockBean
  private UserService userService;

  @Test
  @WithMockUser(username = USER_USERNAME)
  void globalHandlerShouldReturnConflictStatusAndErrorMessage() throws Exception {

    String errorMessage = "Custom exception error message";
    when(userService.getUser(USER_USERNAME)).thenThrow(new RuntimeException(errorMessage));

    mockMvc.perform(get(URL_GET_CURRENT_USER))
        .andExpect(status().isConflict())
        .andExpect(content().string(errorMessage));

  }
}