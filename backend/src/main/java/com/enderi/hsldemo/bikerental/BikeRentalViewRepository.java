package com.enderi.hsldemo.bikerental;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BikeRentalViewRepository extends JpaRepository<BikeRentalView, Long> {
    @Query("select brv.departureStationId as stationId, brv.departureYear as year, brv.departureMonth as month, count(brv.departureStationId) as count" +
            " from BikeRentalView brv" +
            " group by brv.departureStationId, brv.departureYear, brv.departureMonth")
    List<BikeActionsByMonth> fetchRentalsByMonth();

    @Query("select brv.returnStationId as stationId, brv.returnYear as year, brv.returnMonth as month, count(brv.returnStationId) as count" +
            " from BikeRentalView brv" +
            " group by brv.returnStationId, brv.returnYear, brv.returnMonth")
    List<BikeActionsByMonth> fetchReturnsByMonth();

    @Query("select brv from BikeRentalView brv where brv.departureStationId=:id")
    List<BikeRentalView> findByDepartureStationId(long id);

    @Query("select brv from BikeRentalView brv where brv.returnStationId=:id")
    List<BikeRentalView> findByReturnStationId(long id);
}
