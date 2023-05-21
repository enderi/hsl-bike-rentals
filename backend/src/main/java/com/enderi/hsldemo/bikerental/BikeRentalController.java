package com.enderi.hsldemo.bikerental;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("bike-rentals")
public class BikeRentalController {
    @Autowired
    private BikeRentalRepository bikeRentalRepository;

    @GetMapping()
    public List<BikeRental> getAll() {
        return this.bikeRentalRepository.findAll();
    }
}
