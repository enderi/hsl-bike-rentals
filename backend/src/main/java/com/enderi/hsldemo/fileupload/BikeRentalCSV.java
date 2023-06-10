package com.enderi.hsldemo.fileupload;

import lombok.Getter;
import lombok.ToString;

import java.util.Arrays;

@Getter
@ToString
public class BikeRentalCSV {
  private final String departureTime;
  private final String returnTime;
  private final String departureStationId;
  private final String departureStationName;
  private final String returnStationId;
  private final String returnStationName;
  private final String coveredDistanceInMeters;
  private final String durationInSeconds;

  public BikeRentalCSV(String[] split) {
    departureTime = split[0];
    returnTime = split[1];
    departureStationId = split[2];
    departureStationName = split[3];
    returnStationId = split[4];
    returnStationName = split[5];
    coveredDistanceInMeters = split[6];
    durationInSeconds = split[7];
  }
}
