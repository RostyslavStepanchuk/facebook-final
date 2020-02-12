package com.socialmedia.util.friendship;

import com.socialmedia.model.ApplicationUser;

import java.util.Objects;

public class GraphVertex {
  ApplicationUser user;

  GraphVertex(ApplicationUser user) {
    this.user = user;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    GraphVertex that = (GraphVertex) o;
    return Objects.equals(user, that.user);
  }

  @Override
  public int hashCode() {
    return Objects.hash(user);
  }
}
