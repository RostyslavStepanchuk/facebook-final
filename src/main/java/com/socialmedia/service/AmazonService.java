package com.socialmedia.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Date;

@Service
@Configuration
public class AmazonService {

  @Autowired
  private AmazonS3 s3client;

  @Value("${amazonProperties.endpointUrl}")
  private String endpointUrl;
  @Value("${amazonProperties.bucketName}")
  private String bucketName;

  public String uploadFile(MultipartFile multipartFile) {
    String fileUrl = "";
    try {
      File file = convertMultiPartToFile(multipartFile);
      String fileName = generateFileName(multipartFile);
      fileUrl = endpointUrl + "/" + bucketName + "/" + fileName;
      uploadFileToS3bucket(fileName, file);
      file.delete();
    } catch (Exception e) {
      e.printStackTrace();
    }
    return fileUrl;
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

  public boolean deleteFileFromS3Bucket(String fileName) {
    s3client.deleteObject(new DeleteObjectRequest(bucketName, fileName));
    return !s3client.doesObjectExist(bucketName, fileName);
  }
}
