package com.socialmedia.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.socialmedia.model.Image;
import com.socialmedia.repository.ImageRepository;
import com.socialmedia.util.SmartCopyBeanUtilsBean;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;
import java.util.Optional;

@Service
@Configuration
@Slf4j
public class AmazonService extends AbstractCrudService<Image, Long, ImageRepository> {

  private AmazonS3 s3client;

  @Autowired
  public AmazonService(ImageRepository jpaRepository,
                       SmartCopyBeanUtilsBean beanUtilBean,
                       AmazonS3 s3client) {
    super(jpaRepository, beanUtilBean);
    this.s3client = s3client;
  }

  @Value("${amazonProperties.endpointUrl}")
  private String endpointUrl;
  @Value("${amazonProperties.bucketName}")
  private String bucketName;

  public Image uploadFile(MultipartFile multipartFile) {
    try {
      File file = convertMultiPartToFile(multipartFile);
      String fileName = generateFileName(multipartFile);
      uploadFileToS3bucket(fileName, file);
      Image image = new Image();
      image.setKey(fileName);
      image.setSrc(endpointUrl + "/" + bucketName + "/" + fileName);
      jpaRepository.save(image);
      return image;
    } catch (Exception exc) {
      log.error(exc.getMessage(), exc);
      throw new RuntimeException(exc);
    }
  }

  public Boolean deleteFile(String fileName) {
    boolean deleted;
    if (deleteFileFromS3Bucket(fileName)) {
      Optional<Image> existingEntity = jpaRepository.findByKey(fileName);
      existingEntity.ifPresent(image -> {
        jpaRepository.delete(image);
      });
      deleted = true;
    } else {
      deleted = false;
    }
    return deleted;
  }

  private File convertMultiPartToFile(MultipartFile file) throws IOException {
    File convFile = new File(file.getOriginalFilename());
    FileOutputStream fos = new FileOutputStream(convFile);
    fos.write(file.getBytes());
    fos.close();
    return convFile;
  }

  private String generateFileName(MultipartFile multiPart) {
    return new Date().getTime() + "-" + multiPart.getOriginalFilename().replace(" ", "_");
  }

  private void uploadFileToS3bucket(String fileName, File file) {
    s3client.putObject(new PutObjectRequest(bucketName, fileName, file)
        .withCannedAcl(CannedAccessControlList.PublicRead));
  }

  private Boolean deleteFileFromS3Bucket(String fileName) {
    s3client.deleteObject(new DeleteObjectRequest(bucketName, fileName));
    return !s3client.doesObjectExist(bucketName, fileName);
  }
}
