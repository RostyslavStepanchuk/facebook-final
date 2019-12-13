package com.socialmedia.service;

import java.util.List;

public interface CrudServiceDelete<E, T> {
  E getById(T id);
  List<E> getAll();
  E create(E entity);
  E update(T id, E entity);
  E delete (T id);
}
