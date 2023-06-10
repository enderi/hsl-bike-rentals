package com.enderi.hsldemo.bikerental;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

import com.enderi.hsldemo.fileupload.BikeRentalParser;
import com.enderi.hsldemo.fileupload.BikeRentalUploadRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("bike-rentals")
public class BikeRentalController {
  Logger logger = LoggerFactory.getLogger(BikeRentalController.class);
  @Autowired private BikeRentalViewRepository bikeRentalViewRepository;

  @GetMapping("by-date")
  public Map<String, List<BikeActionsByMonth>> groupByDate() {
    var rentals = bikeRentalViewRepository.fetchRentalsByMonth();
    var returns = bikeRentalViewRepository.fetchReturnsByMonth();
    return Map.of("rentals", rentals, "returns", returns);
  }
}
