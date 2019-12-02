package com.socialmedia.controller;

import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

import static org.springframework.http.HttpStatus.NOT_FOUND;

public interface ResponseEntityProvider<T> {

  default ResponseEntity<List<T>> provideResponseForList(List<T> list) {
    if (list.isEmpty()) {
      return new ResponseEntity<>(list, NOT_FOUND);
    } else {
      return ResponseEntity.ok(list);
    }
  }

  default ResponseEntity<T> provideResponseForOptional(Optional<T> potOpt) {
    return potOpt.map(ResponseEntity::ok)
      .orElseGet(ResponseEntity.notFound()::build);
  }
}
