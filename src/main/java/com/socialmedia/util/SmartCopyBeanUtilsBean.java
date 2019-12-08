package com.socialmedia.util;

import com.socialmedia.model.MayAcceptNull;
import org.apache.commons.beanutils.BeanUtilsBean;

import java.lang.reflect.InvocationTargetException;

public class SmartCopyBeanUtilsBean extends BeanUtilsBean {

  @Override
  public void copyProperty(Object dest, String name, Object value) throws IllegalAccessException, InvocationTargetException {

    boolean nullIsNotAcceptable;
    try {
      nullIsNotAcceptable = dest.getClass().getField(name).getAnnotation(MayAcceptNull.class) != null;
    } catch (NoSuchFieldException error) {
      throw new RuntimeException("Unable to find property in destination object");
    }
    if (value == null & nullIsNotAcceptable)
      return;
    super.copyProperty(dest, name, value);
  }
}
