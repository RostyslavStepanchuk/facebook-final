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

        mockMvc.perform(get("/api/v1/users/current"))
            .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(username = "testUser")
    public void getCurrentUserShouldReturnUserObjectWithSuccessResponseCode() throws Exception{

        ApplicationUser applicationUser = ApplicationUser.builder()
            .username("testUser")
            .email("test@test.com")
            .firstName("Tyler").lastName("Durden")
            .birthDate(659998800000L)
            .avatar("http://avataurl.com")
            .refreshToken("034daREFRESHTOKENf341fd")
            .forgotPasswordToken("41fdFORGOTPASSWORDTOKEN093wgs")
            .openAccount(true)
            .build();

        String result = mapper.writeValueAsString(applicationUser);

        RequestBuilder requestBuilder = get("/api/v1/users/current");

        mockMvc.perform(requestBuilder)
            .andExpect(status().isOk());
            // TODO update when DTO is ready
//            .andExpect(content().json(result));
    }

    @Test
    public void signUpShouldReturnNewUser() throws Exception{

        UserCredentials credentials = new UserCredentials("newUser", "strongPassword");
        ApplicationUser applicationUser = ApplicationUser.builder()
            .username(credentials.getUsername())
            .password(credentials.getPassword())
            .build();


        String result = mapper.writeValueAsString(applicationUser);

        RequestBuilder requestBuilder = post("/api/v1/users/sign-up")
            .content(mapper.writeValueAsString(credentials))
            .contentType("application/json");

        mockMvc.perform(requestBuilder)
            .andExpect(status().isOk())
            .andExpect(content().json(result));
    }
}