package com.enderi.hsldemo.bikerental;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BikeRentalRepository extends JpaRepository<BikeRental, Long> {
}
