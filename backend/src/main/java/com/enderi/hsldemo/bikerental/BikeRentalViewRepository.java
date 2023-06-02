package com.enderi.hsldemo.bikerental;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BikeRentalViewRepository extends JpaRepository<BikeRentalView, Long> {
}
