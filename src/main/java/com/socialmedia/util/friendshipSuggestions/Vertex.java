package com.socialmedia.util.friendshipSuggestions;

import com.socialmedia.model.ApplicationUser;

import java.util.Objects;

class Vertex {
    ApplicationUser user;

    Vertex(ApplicationUser user) {
        this.user = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Vertex vertex = (Vertex) o;
        return Objects.equals(user, vertex.user);
    }

    @Override
    public int hashCode() {
        return Objects.hash(user);
    }
}
