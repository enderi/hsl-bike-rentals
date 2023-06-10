package com.enderi.hsldemo.bikerental.dto;

public interface BikeActionsByMonth {
    Long getStationId();
    Integer getYear();
    Integer getMonth();
    Integer getDay();
    Integer getCount();
}
