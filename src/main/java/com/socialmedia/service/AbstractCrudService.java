package com.socialmedia.service;

import com.socialmedia.exception.NoDataFoundException;
import com.socialmedia.model.DbEntity;
import com.socialmedia.util.SmartCopyBeanUtilsBean;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.authentication.BadCredentialsException;

import java.util.List;
import java.util.Optional;

public abstract class AbstractCrudService<E extends DbEntity<T>, T, R extends JpaRepository<E, T>> {

  R jpaRepository;
  SmartCopyBeanUtilsBean beanUtilsBean;

  public AbstractCrudService(R jpaRepository, SmartCopyBeanUtilsBean beanUtilsBean) {
    this.jpaRepository = jpaRepository;
    this.beanUtilsBean = beanUtilsBean;
  }

  public E create(E entity) {
    if (entity.getId() != null && jpaRepository.findById(entity.getId()).isPresent()) {
      throw new BadCredentialsException(
          String.format("%s with id %s already exists",
              entity.getClass().getSimpleName(), String.valueOf(entity.getId())));
    }

    return jpaRepository.save(entity);
  }

  public E delete(T id) {
    Optional<E> entity = jpaRepository.findById(id);
    entity.ifPresent(jpaRepository::delete);
    return resolvedOptional(entity, id);
  }


  public E getById(T id) {
    Optional<E> entity = jpaRepository.findById(id);
    return resolvedOptional(entity, id);
  }

  public List<E> getAll() {
    return jpaRepository.findAll();
  }

  public E update(E existingEnity) {
    return jpaRepository.save(existingEnity);
  }

  public E update(T id, E incomingEntity) {
    E existingEntity = getById(id);
    return update(existingEntity, incomingEntity);
  }

  public E update(E existingEntity, E incomingEntity) {
    try {
      beanUtilsBean.copyProperties(existingEntity, incomingEntity);
      return jpaRepository.save(existingEntity);
    } catch (ReflectiveOperationException reflectionException) {
      throw new ClassCastException(reflectionException.getMessage());
    }
  }

  private E resolvedOptional(Optional<E> entity, T id) {
    return entity.orElseThrow(()->new NoDataFoundException(String.format("Entity with id %s wasn't found", id)));
  }

}
