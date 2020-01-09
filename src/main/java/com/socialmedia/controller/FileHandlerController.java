package com.socialmedia.controller;

import com.socialmedia.dto.image.ImageDtoOut;
import com.socialmedia.mapper.ImageMapper;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.multipart.MultipartFile;


import java.util.List;

@RestController
@RequestMapping("/api/v1/storage")
public class FileHandlerController {
  private ImageMapper imageMapper;

  @Autowired
  public FileHandlerController(ImageMapper imageMapper) {
    this.imageMapper = imageMapper;
  }

  @PostMapping("/upload")
  public ResponseEntity<ImageDtoOut> uploadFile(@RequestPart(value = "file") MultipartFile file) {
    return ResponseEntity.ok(imageMapper.uploadFile(file));
  }

  @DeleteMapping("/delete/{fileName}")
  public ResponseEntity<Boolean> deleteFile(@PathVariable(value = "fileName") String fileName) {
    return ResponseEntity.ok(imageMapper.deleteFile(fileName));
  }

  @GetMapping
  public ResponseEntity<List<ImageDtoOut>> getAll() {
    return ResponseEntity.ok(imageMapper.getAll());
  }
}
