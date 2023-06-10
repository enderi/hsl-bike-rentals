package com.enderi.hsldemo.fileupload;

import com.enderi.hsldemo.bikerental.BikeRentalViewRepository;
import com.enderi.hsldemo.bikerental.parser.BikeRentalParser;
import com.enderi.hsldemo.bikerental.parser.BikeRentalUploadRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.SQLException;
import java.util.Map;

@RestController
@RequestMapping("bike-rentals")
public class FileUploadController {
  Logger logger = LoggerFactory.getLogger(FileUploadController.class);
  @Autowired private BikeRentalViewRepository bikeRentalViewRepository;

  @Autowired private BikeRentalUploadRepository bikeRentalUploadRepository;

  @Autowired private BikeRentalParser bikeRentalParser;

  @GetMapping("by-date")
  public Object groupByDate() {
    var rentals = bikeRentalViewRepository.fetchRentalsByMonth();
    var returns = bikeRentalViewRepository.fetchReturnsByMonth();
    return Map.of("rentals", rentals, "returns", returns);
  }


  @PostMapping("upload")
  public void upload(@RequestParam("file") MultipartFile file) throws IOException, SQLException {
    logger.info("Received file to upload with size {}", file.getSize());
    var entities = this.bikeRentalParser.parseFileContent(file.getInputStream());
    bikeRentalUploadRepository.batchSave(entities);
    logger.info("{} rows persisted", entities.size());
  }
}
