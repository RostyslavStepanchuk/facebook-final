package com.socialmedia.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
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

import java.io.IOException;
import java.util.Date;
import java.util.UUID;

@Service
@Configuration
@Slf4j
public class AmazonService extends AbstractCrudService<Image, Long, ImageRepository> {

  private AmazonS3Client s3client;
  private static final String FILE_EXTENSION = ".png";

  @Autowired
  public AmazonService(ImageRepository jpaRepository,
                       SmartCopyBeanUtilsBean beanUtilBean,
                       AmazonS3Client s3client) {
    super(jpaRepository, beanUtilBean);
    this.s3client = s3client;
  }

  @Value("${amazonProperties.endpointUrl}")
  private String endpointUrl;
  @Value("${amazonProperties.bucketName}")
  private String bucketName;

  @Override
  public Image create(Image entity) {
    throw new UnsupportedOperationException("Images entities must be created only by uploading files");
  }

  @Override
  public Image update(Image existingEntity, Image incomingEntity) {
    throw new UnsupportedOperationException("Images entities mustn't be updated");
  }

  public Image uploadFile(MultipartFile multipartFile) {
    try {
      String fileName = generateFileName();
      uploadFileToS3bucket(fileName, multipartFile);
      Image image = new Image();
      image.setKey(fileName);
      image.setSrc(s3client.getResourceUrl(bucketName, fileName));
      return jpaRepository.save(image);
    } catch (Exception exc) {
      log.error(exc.getMessage(), exc);
      throw new RuntimeException(exc);
    }
  }

  private String generateFileName() {
    return new Date().getTime()
        + "-"
        + UUID.randomUUID().toString().substring(0,4)
        + FILE_EXTENSION;
  }

  private void uploadFileToS3bucket(String fileName, MultipartFile file) throws IOException {
    ObjectMetadata metadata = new ObjectMetadata();
    metadata.setContentLength(file.getBytes().length);

    s3client.putObject(new PutObjectRequest(bucketName,
        fileName,
        file.getInputStream(),
        metadata)
        .withCannedAcl(CannedAccessControlList.PublicRead));
  }

  public Boolean deleteFileFromS3Bucket(String fileName) {
    s3client.deleteObject(bucketName, fileName);
    return !s3client.doesObjectExist(bucketName, fileName);
  }
}
