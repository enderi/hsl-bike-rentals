package com.enderi.hsldemo.bikestation;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "bike_stations")
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class BikeStation {
    @Id
    private Long id;
    @Column(name = "name")
    private String name;
    @Column(name = "x")
    private Double lng;
    @Column(name = "y")
    private Double lat;
}
