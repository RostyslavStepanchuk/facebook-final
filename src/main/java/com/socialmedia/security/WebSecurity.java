package com.socialmedia.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static com.socialmedia.security.SecurityConstants.CONFIRM_EMAIL_URL;
import static com.socialmedia.security.SecurityConstants.LOGIN_URL;
import static com.socialmedia.security.SecurityConstants.RESET_PASSWORD_URL;
import static com.socialmedia.security.SecurityConstants.SET_NEW_PASSWORD_URL;
import static com.socialmedia.security.SecurityConstants.SIGN_UP_URL;
import static com.socialmedia.security.SecurityConstants.USE_REFRESH_TOKEN_URL;
import static com.socialmedia.security.SecurityConstants.WEB_SOCKET_URL;

@EnableWebSecurity
public class WebSecurity extends WebSecurityConfigurerAdapter {

  private UserDetailsService userDetailsService;
  private BCryptPasswordEncoder bcryptPasswordEncoder;
  private JwtAuthenticationFilter jwtAuthenticationFilter;
  private OauthSuccessHandler oauthSuccessHandler;
  private OauthRedirectBlocker oauthRedirectBlocker;

  @Autowired
  public WebSecurity(@Qualifier("UserDetailsServiceImpl") UserDetailsService userDetailsService,
                     BCryptPasswordEncoder bcryptPasswordEncoder,
                     @Lazy JwtAuthenticationFilter jwtAuthenticationFilter,
                     OauthSuccessHandler oauthSuccessHandler,
                     OauthRedirectBlocker oauthRedirectBlocker) {
    this.userDetailsService = userDetailsService;
    this.bcryptPasswordEncoder = bcryptPasswordEncoder;
    this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    this.oauthSuccessHandler = oauthSuccessHandler;
    this.oauthRedirectBlocker = oauthRedirectBlocker;
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.cors().and().csrf().disable().authorizeRequests()
        .antMatchers(HttpMethod.POST, SIGN_UP_URL).permitAll()
        .antMatchers(HttpMethod.POST, LOGIN_URL).permitAll()
        .antMatchers(HttpMethod.POST, USE_REFRESH_TOKEN_URL).permitAll()
        .antMatchers(HttpMethod.POST, RESET_PASSWORD_URL).permitAll()
        .antMatchers(HttpMethod.POST, SET_NEW_PASSWORD_URL).permitAll()
        .antMatchers(HttpMethod.GET, CONFIRM_EMAIL_URL).permitAll()
        .antMatchers(HttpMethod.GET, WEB_SOCKET_URL).permitAll()
        .antMatchers(HttpMethod.GET, "/**/*swagger*/**", "/v2/api-docs").permitAll()
        .anyRequest().authenticated()
        .and()
        .oauth2Login()
        .successHandler(oauthSuccessHandler)
        .and()
        .addFilter(jwtAuthenticationFilter)
        .exceptionHandling().authenticationEntryPoint(oauthRedirectBlocker)
        .and()
        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
  }

  @Override
  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.userDetailsService(userDetailsService).passwordEncoder(bcryptPasswordEncoder);
  }

  @Bean
  @Override
  public AuthenticationManager authenticationManagerBean() throws Exception {
    return super.authenticationManagerBean();
  }
}
