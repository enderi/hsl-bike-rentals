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
    private Double lng;
    @Column(name = "y")
    private Double lat;

    public BikeStation() {}

    public BikeStation(Long id, String name, Double lng, Double lat) {
        this.id = id;
        this.name = name;
        this.lng = lng;
        this.lat = lat;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Double getLng() {
        return lng;
    }

    public Double getLat() {
        return lat;
    }
}
