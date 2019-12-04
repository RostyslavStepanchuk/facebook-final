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

import static com.socialmedia.security.SecurityConstants.LOGIN_URL;
import static com.socialmedia.security.SecurityConstants.SIGN_UP_URL;

@EnableWebSecurity
public class WebSecurity extends WebSecurityConfigurerAdapter {

  private UserDetailsService userDetailsService;
  private BCryptPasswordEncoder bcryptPasswordEncoder;
  private JwtAuthenticationFilter jwtAuthenticationFilter;

  @Autowired
  public WebSecurity(@Qualifier("UserDetailsServiceImpl")UserDetailsService userDetailsService,
                     BCryptPasswordEncoder bcryptPasswordEncoder,
                     @Lazy JwtAuthenticationFilter jwtAuthenticationFilter) {
    this.userDetailsService = userDetailsService;
    this.bcryptPasswordEncoder = bcryptPasswordEncoder;
    this.jwtAuthenticationFilter = jwtAuthenticationFilter;
  }

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.cors().and().csrf().disable().authorizeRequests()
        .antMatchers(HttpMethod.POST, SIGN_UP_URL).permitAll()
        .antMatchers(HttpMethod.POST, LOGIN_URL).permitAll()
        .anyRequest().authenticated()
        .and()
        .addFilter(jwtAuthenticationFilter)
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