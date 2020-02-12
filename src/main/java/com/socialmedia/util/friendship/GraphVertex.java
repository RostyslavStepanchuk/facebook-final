package com.socialmedia.util.friendship;

import com.socialmedia.model.ApplicationUser;

import java.util.Objects;

public class GraphVertex {
  ApplicationUser user;

  GraphVertex(ApplicationUser user) {
    this.user = user;
  }

  @Override
  public boolean equals(Object object) {
    if (this == object) {
      return true;
    }
    if (object == null || getClass() != object.getClass()) {
      return false;
    }
    GraphVertex that = (GraphVertex) object;
    return Objects.equals(user, that.user);
  }

  @Override
  public int hashCode() {
    return Objects.hash(user);
  }
}
