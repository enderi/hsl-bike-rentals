package com.enderi.hsldemo.bikerental;

import java.util.Optional;

import com.enderi.hsldemo.util.Parser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

@Component
public class BikeRentalMapper {
  Logger logger = LoggerFactory.getLogger(BikeRentalMapper.class);

  public Optional<BikeRental> toEntity(BikeRentalCSV bikeRentalCSV) {
    try {
      return Optional.of(
          BikeRental.builder()
              .coveredDistance(Parser.toLong(bikeRentalCSV.getCoveredDistanceInMeters()))
              .duration(Parser.toLong(bikeRentalCSV.getDurationInSeconds()))
              .departureStationId(Long.parseLong(bikeRentalCSV.getDepartureStationId()))
              .departureTime(Parser.toLocalDateTime(bikeRentalCSV.getDepartureTime()))
              .returnStationId(Long.parseLong(bikeRentalCSV.getReturnStationId()))
              .returnTime(Parser.toLocalDateTime(bikeRentalCSV.getReturnTime()))
              .build());
    } catch (Exception e) {
      logger.warn("Error in parsing item {}. Error message: {}", bikeRentalCSV, e.getMessage());
      return Optional.empty();
    }
  }

}
