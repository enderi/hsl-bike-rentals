package com.enderi.hsldemo.bikestation;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "bike_stations")
public class BikeStation {
    @Id
    private Long id;
    @Column(name = "name")
    private String name;
    @Column(name = "x")
    private Double longitude;
    @Column(name = "y")
    private Double latitude;

    public BikeStation() {}

    public BikeStation(Long id, String name, Double longitude, Double latitude) {
        this.id = id;
        this.name = name;
        this.longitude = longitude;
        this.latitude = latitude;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Double getLongitude() {
        return longitude;
    }

    public Double getLatitude() {
        return latitude;
    }
}
