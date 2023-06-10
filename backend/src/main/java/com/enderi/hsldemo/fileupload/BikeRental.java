package com.enderi.hsldemo.bikerental.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "bike_rentals")
@Builder
@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class BikeRental {
  @Id
  private long id;
  @Column private LocalDateTime departureTime;
  @Column private LocalDateTime returnTime;
  @Column private Long departureStationId;
  @Column private Long returnStationId;

  @Column(name = "covered_distance_m")
  private Long coveredDistance;

  @Column(name = "duration_sec")
  private Long duration;
}
