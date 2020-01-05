package com.socialmedia.mapper;

import com.socialmedia.model.DbEntity;
import com.socialmedia.service.AbstractCrudService;
import org.modelmapper.ModelMapper;

import java.util.List;
import java.util.stream.Collectors;

public abstract class AbstractControllerToCrudServiceMapper
    <E extends DbEntity<T>, T, I, O, S extends AbstractCrudService<E, T, ?>> {

  ModelMapper modelMapper;
  S crudService;

  public AbstractControllerToCrudServiceMapper(ModelMapper modelMapper, S crudService) {
    this.modelMapper = modelMapper;
    this.crudService = crudService;
  }

  public O getById(T id) {
    return responseDtoOf(crudService.getById(id));
  }

  public List<O> getAll() {
    return crudService.getAll().stream()
        .map(this::responseDtoOf)
        .collect(Collectors.toList());
  }

  public O create(I dtoIn) {
    E entity = entityOf(dtoIn);
    return responseDtoOf(crudService.create(entity));
  }

  public O update(T id, I dtoIn) {
    E entity = entityOf(dtoIn);
    return responseDtoOf(crudService.update(id, entity));
  }

  public O delete(T id) throws Exception {
    return responseDtoOf(crudService.delete(id));
  }

  abstract O responseDtoOf(E entity);

  abstract E entityOf(I dtoIn);
}
