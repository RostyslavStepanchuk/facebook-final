package com.socialmedia.controller;

import com.socialmedia.service.AmazonService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/storage")
public class FileHandlerController {
  private AmazonService amazonService;

  @Autowired
  FileHandlerController(AmazonService amazonService) {
    this.amazonService = amazonService;
  }

  @PostMapping("/upload")
  public String uploadFile(@RequestPart(value = "file") MultipartFile file) {
    return this.amazonService.uploadFile(file);
  }

  @DeleteMapping("/delete/{fileName}")
  public boolean deleteFile(@PathVariable(value = "fileName") String fileName) {
    return this.amazonService.deleteFileFromS3Bucket(fileName);
  }
}
