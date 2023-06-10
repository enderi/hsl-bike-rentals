package com.enderi.hsldemo.bikerental.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "bike_rentals_by_hour")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class BikeRentalView {
    @Id
    private Long id;
    @Column
    private int departureYear;
    @Column
    private int departureMonth;
    @Column
    private int departureDay;
    @Column
    private int departureHour;
    @Column
    private int returnYear;
    @Column
    private int returnMonth;
    @Column
    private int returnDay;
    @Column
    private int returnHour;
    @Column
    private LocalDateTime departureTime;
    @Column
    private LocalDateTime returnTime;
    @Column
    private Long departureStationId;
    @Column
    private Long returnStationId;
}
