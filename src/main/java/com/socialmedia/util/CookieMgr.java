package com.socialmedia.util;

import org.springframework.stereotype.Component;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import static com.socialmedia.security.SecurityConstants.REFRESH_TOKEN_COOKIE_NAME;
import static com.socialmedia.security.SecurityConstants.REFRESH_TOKEN_COOKIE_PATH;
import static com.socialmedia.security.SecurityConstants.REFRESH_TOKEN_MAX_AGE;

@Component
public class CookieMgr {

  public void addRefreshTokenCookie(HttpServletResponse resp, String refreshToken) {
    Cookie cookie = new Cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken);
    cookie.setPath(REFRESH_TOKEN_COOKIE_PATH);
    cookie.setMaxAge((int)(REFRESH_TOKEN_MAX_AGE / 1000));
    //cookie.setSecure(true);
    cookie.setHttpOnly(true);
    resp.addCookie(cookie);
  }

  public void removeRefreshTokenCookie(HttpServletResponse resp) {
    Cookie cookie = new Cookie(REFRESH_TOKEN_COOKIE_NAME, "");
    cookie.setPath(REFRESH_TOKEN_COOKIE_PATH);
    cookie.setMaxAge(0);
    //cookie.setSecure(true);
    cookie.setHttpOnly(true);
    resp.addCookie(cookie);
  }

}
