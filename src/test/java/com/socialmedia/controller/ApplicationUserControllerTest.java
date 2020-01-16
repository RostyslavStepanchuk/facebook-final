package com.socialmedia.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jayway.jsonpath.JsonPath;
import com.socialmedia.dto.user.UserRegistrationDtoIn;
import com.socialmedia.model.Image;
import com.socialmedia.service.AmazonService;
import com.socialmedia.util.EmailHandler;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;

import static com.socialmedia.controller.util.TestConstants.CONTENT_TYPE_JSON;
import static com.socialmedia.controller.util.TestConstants.URL_CONFIRM_EMAIL;
import static com.socialmedia.controller.util.TestConstants.URL_GET_CURRENT_USER;
import static com.socialmedia.controller.util.TestConstants.URL_USERS_BASIC;
import static com.socialmedia.controller.util.TestConstants.USER3_USERNAME;
import static com.socialmedia.controller.util.TestConstants.USER_AVATAR_URL;
import static com.socialmedia.controller.util.TestConstants.USER_BIRTH_DATE;
import static com.socialmedia.controller.util.TestConstants.USER_EMAIL;
import static com.socialmedia.controller.util.TestConstants.USER_EMAIL_CONFIRMATION_ID;
import static com.socialmedia.controller.util.TestConstants.USER_FIRST_NAME;
import static com.socialmedia.controller.util.TestConstants.USER_GENDER;
import static com.socialmedia.controller.util.TestConstants.USER_LAST_NAME;
import static com.socialmedia.controller.util.TestConstants.USER_OPEN_ACCOUNT;
import static com.socialmedia.controller.util.TestConstants.USER_PROFILE_COVER_URL;
import static com.socialmedia.controller.util.TestConstants.USER_USERNAME;
import static org.hamcrest.Matchers.comparesEqualTo;
import static org.hamcrest.collection.IsIterableWithSize.iterableWithSize;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
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

    @MockBean
    private EmailHandler emailHandler;

    @MockBean
    private AmazonService imageService;

    @Test
    public void getCurrentUserShouldBlockRequestWithoutAuthentication() throws Exception{

        mockMvc.perform(get(URL_USERS_BASIC))
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
            .andExpect(jsonPath("$.avatar.src").value(USER_AVATAR_URL))
            .andExpect(jsonPath("$.profileCover.src").value(USER_PROFILE_COVER_URL))
            .andExpect(jsonPath("$.gender").value(USER_GENDER))
            .andExpect(jsonPath("$.openAccount").value(USER_OPEN_ACCOUNT))
            .andExpect(jsonPath("$.friends", iterableWithSize(comparesEqualTo(1))))
            .andExpect(jsonPath("$.incomingFriendRequests", iterableWithSize(comparesEqualTo(1))));

    }

    @Test
    public void signUpShouldCreateNewUserAndReturnAccessToken() throws Exception{

        String newUser = "newUser";
        String newPassword = "newPassword";
        String newEmail = "newEmail@test.com";

        UserRegistrationDtoIn userRegistrationDtoIn = new UserRegistrationDtoIn();

        userRegistrationDtoIn.setUsername(newUser);
        userRegistrationDtoIn.setPassword(newPassword);
        userRegistrationDtoIn.setEmail(newEmail);

        RequestBuilder requestBuilder = post(URL_USERS_BASIC)
            .content(mapper.writeValueAsString(userRegistrationDtoIn))
            .contentType(CONTENT_TYPE_JSON);

        String responseContentAsString = mockMvc.perform(requestBuilder)
            .andExpect(status().isOk())
            .andReturn()
            .getResponse()
            .getContentAsString();

        String token = JsonPath.parse(responseContentAsString).read("$.accessToken");

        RequestBuilder checkCreatedUserRequest = get(URL_GET_CURRENT_USER)
            .header("Authorization", "Bearer " + token);

        mockMvc.perform(checkCreatedUserRequest)
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.username").value(newUser));
    }

    @Test
    @WithMockUser(username = USER_USERNAME)
    public void updateUserShouldReturnUserWithUpdatedFieldsAndNotNullFieldsAreNotEmpty() throws Exception {
        String newLastName = "Wane";
        UserRegistrationDtoIn userRegistrationDtoIn = new UserRegistrationDtoIn();
        userRegistrationDtoIn.setLastName(newLastName);
        userRegistrationDtoIn.setUsername(USER_USERNAME);

        RequestBuilder requestBuilder = put(URL_USERS_BASIC)
            .content(mapper.writeValueAsString(userRegistrationDtoIn))
            .contentType(CONTENT_TYPE_JSON);

        mockMvc.perform(requestBuilder)
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.username").value(USER_USERNAME))
            .andExpect(jsonPath("$.lastName").value(newLastName))
            .andExpect(jsonPath("$.email").isNotEmpty())
            .andExpect(jsonPath("$.avatar").isNotEmpty())
            .andExpect(jsonPath("$.openAccount").isNotEmpty())
            .andExpect(jsonPath("$.emailIsConfirmed").isNotEmpty())
            .andExpect(jsonPath("$.firstName").isNotEmpty())
            .andExpect(jsonPath("$.birthDate").isEmpty());
    }

    @Test
    public void updateUserShouldNotAllowUpdateNonAuthenticatedUser() throws Exception {
        UserRegistrationDtoIn userRegistrationDtoIn = new UserRegistrationDtoIn();

        RequestBuilder requestBuilder = put(URL_USERS_BASIC)
            .content(mapper.writeValueAsString(userRegistrationDtoIn))
            .contentType(CONTENT_TYPE_JSON);

        mockMvc.perform(requestBuilder)
            .andExpect(status().isForbidden());
    }

    @Test
    public void deleteUserShouldNotAllowToDeleteNonAuthenticatedUser() throws Exception {

        mockMvc.perform(delete(URL_USERS_BASIC))
            .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser(username = USER3_USERNAME)
    public void deleteUserShouldDeleteAuthenticatedUser() throws Exception {

      Image image = new Image();
      image.setId(1L);
      when(imageService.deleteFileFromS3Bucket(anyString())).thenReturn(true);
        mockMvc.perform(delete(URL_USERS_BASIC))
            .andExpect(status().isOk());
    }

    @Test
    public void confirmEmailShouldReturnTrueIfIdIsValid() throws Exception {

        mockMvc.perform(get(String.format(URL_CONFIRM_EMAIL, USER_EMAIL_CONFIRMATION_ID)))
            .andExpect(status().isOk());
    }

    @Test
    public void confirmEmailShouldReturnConflictIfIdIsInvalid() throws Exception {

        mockMvc.perform(get(String.format(URL_CONFIRM_EMAIL, "INVALID_EMAIL_CONFIRMATION_ID")))
            .andExpect(status().isConflict());
    }
}