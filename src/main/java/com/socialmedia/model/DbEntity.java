package com.socialmedia.model;

public interface DbEntity<T> {
  T getId();
  default boolean sameEntity( DbEntity<T> obj) {
    if (obj == null) return false;
    if (this.getClass() != obj.getClass()) {
      return false;
    }
      return getId() == obj.getId();
  }
}
