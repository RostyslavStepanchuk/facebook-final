package com.socialmedia.model;

import com.socialmedia.service.AmazonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.persistence.PreRemove;

@Component
public class ImageListener {

  private static AmazonService amazonService;

  @Autowired
  public void setAmazonService(AmazonService amazonService) {
    ImageListener.amazonService = amazonService;
  }

  @PreRemove
  public void deleteFromStorage(Image image) {
    Boolean deleted = amazonService.deleteFileFromS3Bucket(image.getKey());
    if (!deleted) {
      throw new RuntimeException("Unable to delete image from storage");
    }
  }
}
