package com.socialmedia.mapper;

import com.socialmedia.dto.image.ImageDtoIn;
import com.socialmedia.dto.image.ImageDtoOut;
import com.socialmedia.model.Image;
import com.socialmedia.service.AmazonService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Component
public class ImageMapper extends AbstractControllerToCrudServiceMapper<Image, Long, ImageDtoIn, ImageDtoOut, AmazonService> {

  @Autowired
  public ImageMapper(ModelMapper modelMapper,
                    AmazonService crudService) {
    super(modelMapper, crudService);
  }

  public ImageDtoOut responseDtoOf(Image entity) {
    return modelMapper.map(entity, ImageDtoOut.class);
  }

  @Override
  public Image entityOf(ImageDtoIn dtoIn) {
    return modelMapper.map(dtoIn, Image.class);
  }

  public ImageDtoOut uploadFile(MultipartFile file) {
    return responseDtoOf(crudService.uploadFile(file));
  }

  public Boolean deleteFile(Long fileId) {
    return crudService.deleteFile(fileId);
  }
}
