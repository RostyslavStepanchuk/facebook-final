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
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;
import java.util.UUID;

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

  @Override
  public Image create(Image entity) {
    throw new RuntimeException("Images entities must be created only by uploading files");
  }

  @Override
  public Image update(Image existingEntity, Image incomingEntity) {
    throw new RuntimeException("Images entities mustn't be updated");
  }

  @Override
  public Image delete(Long fileId) {
    Image image = getById(fileId);
    boolean isDeleted = deleteFileFromS3Bucket(image.getKey());
    if (isDeleted) {
      jpaRepository.deleteById(image.getId());
      return image;
    }
    throw new RuntimeException("Image wasn't found in storage");
  }

  public Image uploadFile(MultipartFile multipartFile) {
    try {
      File file = convertMultiPartToFile(multipartFile);
      String fileName = generateFileName();
      uploadFileToS3bucket(fileName, file);
      Image image = new Image();
      image.setKey(fileName);
      image.setSrc(endpointUrl + "/" + bucketName + "/" + fileName);
      jpaRepository.save(image);
      boolean deleted = file.delete();
      if (!deleted) {
        throw new RuntimeException("Images are not deleted from sever temporary storage");
      }
      return image;
    } catch (Exception exc) {
      log.error(exc.getMessage(), exc);
      throw new RuntimeException(exc);
    }
  }

  private File convertMultiPartToFile(MultipartFile file) throws IOException {

    FileOutputStream fos = null;
    try {
      File convFile = new File(file.getOriginalFilename());
      fos = new FileOutputStream(convFile);
      fos.write(file.getBytes());
      return convFile;
    } finally {
      if (fos != null) {
        fos.close();
      }
    }

  }

  private String generateFileName() {
    return new Date().getTime() + "-" + UUID.randomUUID().toString().substring(0,7);
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
