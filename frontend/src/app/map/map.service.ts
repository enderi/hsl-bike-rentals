import { Injectable, NgZone } from '@angular/core';
import { Subject, forkJoin } from 'rxjs';
import {
  StationInfo,
  addDeparture,
  addStation,
  addreturn,
  getStationIds,
  getStationTraffic,
} from '../station-traffic';
import { BikeStationsService } from '../service/bike-stations.service';
import { CircleMarker } from 'leaflet';
import { CustomMarker } from './custom-marker';
import { MapEvents } from './map-events';
import { RentalsService } from '../service/rentals.service';

declare module Lex {
  export interface CircleMarkerExtended {
    bindProps(name: string, options: any): CircleMarker;
  }
}

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private readonly _events = new Subject<{}>();
  private readonly _markers = new Subject<CustomMarker[]>();

  private readonly markersByStationId: { [key: string]: CustomMarker } = {};
  private readonly _selectedStation = new Subject<String>();

  get selectedStation() {
    return this._selectedStation;
  }

  private stationSelection: CustomMarker | undefined;

  get events() {
    return this._events;
  }

  get markers() {
    return this._markers;
  }

  constructor(
    private ngZone: NgZone,
    private rentalsService: RentalsService,
    private bikeStationService: BikeStationsService
  ) {}

  public emit(event: string, options: {}) {
    this.events.next({ ...options, name: event });
  }

  initMarkers() {
    forkJoin({
      stations: this.rentalsService.fetchBikeStations(),
      rentalsAndReturns: this.rentalsService.fetchRentalsByMonth(1, 1),
    }).subscribe((result) => {
      result.stations.forEach((st) => addStation(st));
      result.rentalsAndReturns.rentals.forEach((rent) => addDeparture(rent));
      result.rentalsAndReturns.returns.forEach((ret) => addreturn(ret));
      this.buildMarkers();
    });
  }

  public addMarkers(markers: any[]) {
    this._markers.next(markers);
  }

  public buildMarker(stationId: string): CustomMarker | null {
    const traffic: StationInfo = getStationTraffic(stationId);
    if (!traffic || !traffic.info) {
      return null;
    }
    if (traffic.totalDepartures === 0 && traffic.totalReturns === 0) {
      return null;
    }
    const customMarker = CustomMarker.of(traffic);

    customMarker.bindListener('click', () =>
      this.ngZone.run(() => this.selectStation(customMarker))
    );
    customMarker.bindListener('mouseover', () =>
      this.events.next({
        name: MapEvents.markerMouseOver,
        marker: customMarker,
      })
    );
    customMarker.bindListener('mouseout', () =>
      this.events.next({ name: MapEvents.markerMouseOut, marker: customMarker })
    );
    this.markersByStationId[stationId] = customMarker;

    return customMarker;
  }

  public buildMarkers() {
    const markers: any[] = [];
    getStationIds().forEach((id) => {
      const l = this.buildMarker(id);
      if (l) {
        markers.push(l);
      }
    });
    this.addMarkers(markers);
  }

  public highlightStation(id: number) {
    this.markersByStationId[id].marker.setStyle({
      opacity: 1,
      color: 'purple',
      fillOpacity: 0.8,
      weight: 2,
    });
  }

  public resetStation(id: number) {
    this.markersByStationId[id].resetMarkerProps();
  }

  public selectStation(station: CustomMarker) {
    this.stationSelection?.unSelect();
    if (
      this.stationSelection?.stationInfo.info.id === station.stationInfo.info.id
    ) {
      this.stationSelection = undefined;
      return;
    }
    station.setSelected();
    this.stationSelection = station;
    this.bikeStationService.fetchSelected(station.stationInfo.info.id);
  }
}
