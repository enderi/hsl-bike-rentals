import { Injectable } from '@angular/core';
import { RentalsByMonth } from '../model/rentals-by-month';
import { Station } from '../model/station';

export interface StationInfo {
  info: BikeStationMeta;
  returns: { [key: string]: number };
  departures: { [key: string]: number };
  totalDepartures: number;
  totalReturns: number;
}

export interface BikeStationMeta {
  id: number;
  name: string;
  lat: number;
  lng: number;
}

export interface TrafficPerHour {
  hour: number;
  stationId: number;
  count: number;
}

@Injectable({
  providedIn: 'root',
})
export class BikeStationHandler {
  stationsById: { [key: number]: StationInfo };

  constructor() {
    this.stationsById = {};
  }

  addStation(station: Station) {
    const stationInfo = this.initStation(station.id);
    stationInfo.info = {
      id: station.id,
      name: station.name,
      lat: station.lat,
      lng: station.lng,
    };
  }

  addDeparture(trafficPerHour: RentalsByMonth) {
    const stationInfo = this.initStation(trafficPerHour.stationId);
    const d = this.buildDate(trafficPerHour.year, trafficPerHour.month);
    stationInfo.departures[d] = trafficPerHour.count;
    stationInfo.totalDepartures += trafficPerHour.count;
  }

  addreturn(trafficPerHour: RentalsByMonth) {
    const stationInfo = this.initStation(trafficPerHour.stationId);
    const d = this.buildDate(trafficPerHour.year, trafficPerHour.month);
    stationInfo.returns[d] = trafficPerHour.count;
    stationInfo.totalReturns += trafficPerHour.count;
  }

  getStation(id: number) {
    return this.stationsById[id];
  }

  getStationIds() {
    return Object.keys(this.stationsById);
  }

  getStationTraffic(stationId: any): StationInfo {
    return this.stationsById[stationId];
  }

  getRanges() {
    let min: number | null = null;
    let max: number = 0;
    Object.entries(this.stationsById).forEach(([key, value]) => {
      max = Math.max(max, value.totalDepartures, value.totalReturns);
      if (!min && min !== 0) {
        min = Math.min(value.totalDepartures, value.totalReturns);
      } else if (min !== 0) {
        min = Math.min(min, value.totalDepartures, value.totalReturns);
      }
    });
    return {
      min,
      max,
    };
  }

  private initStation(id: number): StationInfo {
    this.stationsById[id] = this.stationsById[id] || {
      info: null,
      departures: {},
      returns: {},
      totalDepartures: 0,
      totalReturns: 0,
    };

    return this.stationsById[id];
  }

  private buildDate(year: number, month: number, day?: number): string {
    if (day) {
      return `${year}-${month}-${day}`;
    }
    return `${year}-${month}`;
  }
}
