package com.socialmedia.security;

import com.socialmedia.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;

@Component
public class OauthSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

  private static final String BASE_URL = "http://localhost:3000";

  @Autowired
  private AuthenticationService authenticationService;

  @Override
  public void onAuthenticationSuccess(HttpServletRequest request,
                                      HttpServletResponse response,
                                      Authentication authentication) throws IOException {
    DefaultOidcUser oidcUser = (DefaultOidcUser) authentication.getPrincipal();
    Map attributes = oidcUser.getAttributes();
    String email = (String) attributes.get("email");
    String redirectionUrl;
    try {
      String token = authenticationService.generateTokenForOauthUser(email);
      redirectionUrl = UriComponentsBuilder.fromUriString(BASE_URL)
          .queryParam("token", token)
          .build().toUriString();

    } catch (BadCredentialsException exception) {
      redirectionUrl = UriComponentsBuilder.fromUriString(BASE_URL + "/login")
          .queryParam("error", exception.getMessage())
          .build().toUriString();
    }
    getRedirectStrategy().sendRedirect(request, response, redirectionUrl);

  }
}
