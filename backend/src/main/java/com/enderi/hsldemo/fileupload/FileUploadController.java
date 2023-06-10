package com.enderi.hsldemo.fileupload;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.SQLException;


@RestController
@RequestMapping("file-upload")
public class FileUploadController {
  Logger logger = LoggerFactory.getLogger(FileUploadController.class);

  @Autowired private BikeRentalUploadRepository bikeRentalUploadRepository;

  @Autowired private BikeRentalParser bikeRentalParser;

  @PostMapping("rental-data")
  public void upload(@RequestParam("file") MultipartFile file) throws IOException, SQLException {
    logger.info("Received file to upload with size {}", file.getSize());
    var entities = this.bikeRentalParser.parseFileContent(file.getInputStream());
    bikeRentalUploadRepository.batchSave(entities);
    logger.info("{} rows persisted", entities.size());
  }
}
