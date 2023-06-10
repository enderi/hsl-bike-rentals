package com.enderi.hsldemo.bikestation;


import java.util.List;
import java.util.Map;

import com.enderi.hsldemo.bikerental.BikeRentalView;
import com.enderi.hsldemo.bikerental.BikeRentalViewRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("bike-stations")
public class BikeStationController {
    @Autowired
    private BikeStationRepository bikeStationRepository;

    @Autowired
    private BikeRentalViewRepository bikeRentalViewRepository;

    @GetMapping
    public List<BikeStation> getAll() {
        return bikeStationRepository.findAll();
    }

    @GetMapping("/{id}")
    public StationInfoResponse get(@PathVariable("id") long id) {
        var station = bikeStationRepository.findById(id).orElseThrow();
        var rentals = bikeRentalViewRepository.findByDepartureStationId(id);
        var returns = bikeRentalViewRepository.findByReturnStationId(id);
        return new StationInfoResponse(station, rentals, returns);
    }

    @AllArgsConstructor
    @Getter
    private static class StationInfoResponse {
        BikeStation station;
        List<BikeRentalView> rentals;
        List<BikeRentalView> returns;
    }
}
