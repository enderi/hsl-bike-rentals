package com.enderi.hsldemo.bikerental;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import lombok.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("bike-rentals")
public class BikeRentalController {
  Logger logger = LoggerFactory.getLogger(BikeRentalController.class);

  @Autowired private BikeRentalRepository bikeRentalRepository;
  @Autowired private BikeRentalViewRepository bikeRentalViewRepository;

  @Autowired private BikeRentalUploadRepository bikeRentalUploadRepository;

  @Autowired private BikeRentalParser bikeRentalParser;

  @GetMapping()
  public List<BikeRental> getAll() {
    return this.bikeRentalRepository.findAll();
  }

  @GetMapping("by-date")
  public List<BikeRentalView> groupByDate() {
    return bikeRentalViewRepository.findAll().stream().limit(100).toList();
  }


  @PostMapping("upload")
  public void upload(@RequestParam("file") MultipartFile file) throws IOException, SQLException {
    logger.info("Received file to upload with size {}", file.getSize());
    var entities = this.bikeRentalParser.parseFileContent(file.getInputStream());
    bikeRentalUploadRepository.batchSave(entities);
    logger.info("{} rows persisted", entities.size());
  }
}
