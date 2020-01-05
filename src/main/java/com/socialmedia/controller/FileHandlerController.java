package com.socialmedia.controller;

import com.socialmedia.dto.image.ImageDtoOut;
import com.socialmedia.mapper.ImageMapper;
import com.socialmedia.model.Image;
import com.socialmedia.service.AmazonService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/v1/storage")
public class FileHandlerController {
  private ImageMapper imageMapper;
  //private AmazonService amazonService;

//  @Autowired
//  FileHandlerController(AmazonService amazonService) {
//    this.amazonService = amazonService;
//  }
  @Autowired
  public FileHandlerController(ImageMapper imageMapper) {
    this.imageMapper = imageMapper;
  }

//  @PostMapping("/upload")
//  public String uploadFile(@RequestPart(value = "file") MultipartFile file) {
//    return this.amazonService.uploadFile(file);
//  }

  @PostMapping("/upload")
  public ResponseEntity<ImageDtoOut> uploadFile(@RequestPart(value = "file") MultipartFile file) {
    //this.amazonService.uploadFile(file);
    return ResponseEntity.ok(imageMapper.uploadFile(file));
  }

//  @DeleteMapping("/delete/{fileName}")
//  public boolean deleteFile(@PathVariable(value = "fileName") String fileName) {
//    return this.amazonService.deleteFileFromS3Bucket(fileName);
//  }

  @DeleteMapping("/delete/{fileName}")
  public ResponseEntity<Boolean> deleteFile(@PathVariable(value = "fileName") String fileName) {
    return ResponseEntity.ok(imageMapper.deleteFile(fileName));
  }

  @GetMapping
  public ResponseEntity<List<ImageDtoOut>> getAll() {
    return ResponseEntity.ok(imageMapper.getAll());
  }
}
