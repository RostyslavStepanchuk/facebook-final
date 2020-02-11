package com.socialmedia.util.friendship;

import com.socialmedia.model.ApplicationUser;

import java.util.Objects;

class Vertex {
  ApplicationUser user;

  Vertex(ApplicationUser user) {
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
    Vertex vertex = (Vertex) object;
    return Objects.equals(user, vertex.user);
  }

  @Override
  public int hashCode() {
    return Objects.hash(user);
  }
}
