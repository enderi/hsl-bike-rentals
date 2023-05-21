package com.enderi.hsldemo.bikestation;


import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("bike-stations")
public class BikeStationController {
    @Autowired
    private BikeStationRepository bikeStationRepository;

    @GetMapping
    public List<BikeStation> getAll() {
        return bikeStationRepository.findAll();
    }
}
