package com.socialmedia.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jayway.jsonpath.JsonPath;
import com.socialmedia.dto.security.UserCredentials;
import com.socialmedia.model.ApplicationUser;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;

import java.util.Collections;

import static com.socialmedia.controller.util.TestConstants.CONTENT_TYPE_JSON;
import static com.socialmedia.controller.util.TestConstants.URL_GET_CURRENT_USER;
import static com.socialmedia.controller.util.TestConstants.URL_SIGN_UP;
import static com.socialmedia.controller.util.TestConstants.USER_AVATAR_URL;
import static com.socialmedia.controller.util.TestConstants.USER_BIRTH_DATE;
import static com.socialmedia.controller.util.TestConstants.USER_EMAIL;
import static com.socialmedia.controller.util.TestConstants.USER_FIRST_NAME;
import static com.socialmedia.controller.util.TestConstants.USER_LAST_NAME;
import static com.socialmedia.controller.util.TestConstants.USER_OPEN_ACCOUNT;
import static com.socialmedia.controller.util.TestConstants.USER_USERNAME;
import static org.hamcrest.Matchers.comparesEqualTo;
import static org.hamcrest.collection.IsIterableWithSize.iterableWithSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@RunWith(SpringRunner.class)
@AutoConfigureMockMvc
public class ApplicationUserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper mapper;

    @Test
    public void getCurrentUserShouldBlockRequestWithoutAuthentication() throws Exception{

        mockMvc.perform(get(URL_GET_CURRENT_USER))
            .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(username = USER_USERNAME)
    public void getCurrentUserShouldReturnUserObjectWithSuccessResponseCode() throws Exception{


        mockMvc.perform(get(URL_GET_CURRENT_USER))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.username").value(USER_USERNAME))
            .andExpect(jsonPath("$.birthDate").value(USER_BIRTH_DATE))
            .andExpect(jsonPath("$.email").value(USER_EMAIL))
            .andExpect(jsonPath("$.firstName").value(USER_FIRST_NAME))
            .andExpect(jsonPath("$.lastName").value(USER_LAST_NAME))
            .andExpect(jsonPath("$.avatar").value(USER_AVATAR_URL))
            .andExpect(jsonPath("$.openAccount").value(USER_OPEN_ACCOUNT))
            .andExpect(jsonPath("$.friends", iterableWithSize(comparesEqualTo(1))))
            .andExpect(jsonPath("$.incomingFriendRequests", iterableWithSize(comparesEqualTo(1))));

    }

    @Test
    public void signUpShouldCreateNewUserAndReturnAccessToken() throws Exception{

        String newUser = "newUser";
        String newPassword = "newPassword";
        UserCredentials credentials = new UserCredentials(newUser, newPassword);

        RequestBuilder requestBuilder = post(URL_SIGN_UP)
            .content(mapper.writeValueAsString(credentials))
            .contentType(CONTENT_TYPE_JSON);

        String responseContentAsString = mockMvc.perform(requestBuilder)
            .andExpect(status().isOk())
            .andReturn()
            .getResponse()
            .getContentAsString();

        String token = JsonPath.parse(responseContentAsString).read("$.accessToken");

        RequestBuilder checkCreatedUserRequest = get(URL_GET_CURRENT_USER)
            .header("Authorization", "Bearer " + token);

        ApplicationUser applicationUser = ApplicationUser.builder()
            .username(credentials.getUsername())
            .password(credentials.getPassword())
            .incomingFriendRequests(Collections.emptyList())
            .build();


        String result = mapper.writeValueAsString(applicationUser);

        mockMvc.perform(checkCreatedUserRequest)
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.username").value(newUser));
    }
}