package com.enderi.hsldemo.bikerental;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import java.time.LocalDateTime;

@Entity
public class BikeRental {
  @Id private Long id;
  @Column private LocalDateTime departureTime;
  @Column private LocalDateTime returnTime;
  @Column private String departureStationName;
  @Column private String returnStationName;
  @Column private Long departureStationId;
  @Column private Long returnStationId;

  @Column(name = "covered_distance_m")
  private Long coveredDistance;

  @Column(name = "duration_sec")
  private Long duration;

  public BikeRental() {}

  public BikeRental(
      Long id,
      LocalDateTime departureTime,
      LocalDateTime returnTime,
      String departureStationName,
      String returnStationName,
      Long departureStationId,
      Long returnStationId,
      Long coveredDistance,
      Long duration) {
    this.id = id;
    this.departureTime = departureTime;
    this.returnTime = returnTime;
    this.departureStationName = departureStationName;
    this.returnStationName = returnStationName;
    this.departureStationId = departureStationId;
    this.returnStationId = returnStationId;
    this.coveredDistance = coveredDistance;
    this.duration = duration;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public LocalDateTime getDepartureTime() {
    return departureTime;
  }

  public void setDepartureTime(LocalDateTime departureTime) {
    this.departureTime = departureTime;
  }

  public LocalDateTime getReturnTime() {
    return returnTime;
  }

  public void setReturnTime(LocalDateTime returnTime) {
    this.returnTime = returnTime;
  }

  public String getDepartureStationName() {
    return departureStationName;
  }

  public void setDepartureStationName(String departureStationName) {
    this.departureStationName = departureStationName;
  }

  public String getReturnStationName() {
    return returnStationName;
  }

  public void setReturnStationName(String returnStationName) {
    this.returnStationName = returnStationName;
  }

  public Long getDepartureStationId() {
    return departureStationId;
  }

  public void setDepartureStationId(Long departureStationId) {
    this.departureStationId = departureStationId;
  }

  public Long getReturnStationId() {
    return returnStationId;
  }

  public void setReturnStationId(Long returnStationId) {
    this.returnStationId = returnStationId;
  }

  public Long getCoveredDistance() {
    return coveredDistance;
  }

  public void setCoveredDistance(Long coveredDistance) {
    this.coveredDistance = coveredDistance;
  }

  public Long getDuration() {
    return duration;
  }

  public void setDuration(Long duration) {
    this.duration = duration;
  }
}
