package com.enderi.hsldemo.bikestation;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BikeStationRepository extends JpaRepository<BikeStation, Long> {
}
