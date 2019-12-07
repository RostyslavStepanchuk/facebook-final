package com.socialmedia.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
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

import static com.socialmedia.controller.util.TestConstants.CONTENT_TYPE_JSON;
import static com.socialmedia.controller.util.TestConstants.URL_GET_CURRENT_USER;
import static com.socialmedia.controller.util.TestConstants.URL_SIGN_UP;
import static com.socialmedia.controller.util.TestConstants.USER_AVATAR_URL;
import static com.socialmedia.controller.util.TestConstants.USER_BIRTH_DATE;
import static com.socialmedia.controller.util.TestConstants.USER_EMAIL;
import static com.socialmedia.controller.util.TestConstants.USER_FIRST_NAME;
import static com.socialmedia.controller.util.TestConstants.USER_FORGOT_PASSWORD_TOKEN;
import static com.socialmedia.controller.util.TestConstants.USER_LAST_NAME;
import static com.socialmedia.controller.util.TestConstants.USER_OPEN_ACCOUNT;
import static com.socialmedia.controller.util.TestConstants.USER_REFRESH_TOKEN;
import static com.socialmedia.controller.util.TestConstants.USER_USERNAME;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
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

        ApplicationUser applicationUser = ApplicationUser.builder()
            .username(USER_USERNAME)
            .email(USER_EMAIL)
            .firstName(USER_FIRST_NAME).lastName(USER_LAST_NAME)
            .birthDate(USER_BIRTH_DATE)
            .avatar(USER_AVATAR_URL)
            .refreshToken(USER_REFRESH_TOKEN)
            .forgotPasswordToken(USER_FORGOT_PASSWORD_TOKEN)
            .openAccount(USER_OPEN_ACCOUNT)
            .build();

        String result = mapper.writeValueAsString(applicationUser);

        RequestBuilder requestBuilder = get(URL_GET_CURRENT_USER);

        mockMvc.perform(requestBuilder)
            .andExpect(status().isOk());
            // TODO update when DTO is ready
//            .andExpect(content().json(result));
    }

    @Test
    public void signUpShouldReturnNewUser() throws Exception{

        UserCredentials credentials = new UserCredentials("newUser", "newPassword");
        ApplicationUser applicationUser = ApplicationUser.builder()
            .username(credentials.getUsername())
            .password(credentials.getPassword())
            .build();


        String result = mapper.writeValueAsString(applicationUser);

        RequestBuilder requestBuilder = post(URL_SIGN_UP)
            .content(mapper.writeValueAsString(credentials))
            .contentType(CONTENT_TYPE_JSON);

        mockMvc.perform(requestBuilder)
            .andExpect(status().isOk())
            .andExpect(content().json(result));
    }
}