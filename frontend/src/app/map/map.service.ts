import { Injectable, NgZone } from '@angular/core';
import { Subject, forkJoin } from 'rxjs';
import { BikeStationsService } from '../service/bike-stations.service';
import { CircleMarker } from 'leaflet';
import { MarkerWithProps } from './custom-marker';
import { MapEvents } from './map-events';
import {
  BikeStationHandler,
  StationInfo,
} from '../bike-station-handler/bike-stations-handler';

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
  private readonly _markers = new Subject<MarkerWithProps[]>();

  private readonly markersByStationId: { [key: string]: MarkerWithProps } = {};
  private readonly _selectedStation = new Subject<String>();

  get selectedStation() {
    return this._selectedStation;
  }

  private stationSelection: MarkerWithProps | undefined;

  get events() {
    return this._events;
  }

  get markers() {
    return this._markers;
  }

  constructor(
    private ngZone: NgZone,
    private bikeStationService: BikeStationsService,
    private bikeStationHandler: BikeStationHandler
  ) {}

  public emit(event: string, options: {}) {
    this.events.next({ ...options, name: event });
  }

  initMarkers() {
    forkJoin({
      stations: this.bikeStationService.fetchBikeStations(),
      rentalsAndReturns: this.bikeStationService.fetchRentalsByMonth(),
    }).subscribe((result) => {
      result.stations.forEach((st) => this.bikeStationHandler.addStation(st));
      result.rentalsAndReturns.rentals.forEach((rent) =>
        this.bikeStationHandler.addDeparture(rent)
      );
      result.rentalsAndReturns.returns.forEach((ret) =>
        this.bikeStationHandler.addreturn(ret)
      );
      this.buildMarkers();
    });
  }

  public addMarkers(markers: any[]) {
    this._markers.next(markers);
  }

  public buildMarker(stationId: string): MarkerWithProps | null {
    const traffic: StationInfo =
      this.bikeStationHandler.getStationTraffic(stationId);
    if (!traffic || !traffic.info) {
      return null;
    }
    if (traffic.totalDepartures === 0 && traffic.totalReturns === 0) {
      return null;
    }
    const customMarker = MarkerWithProps.of(traffic);

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
    this.bikeStationHandler.getStationIds().forEach((id) => {
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

  public selectStation(station: MarkerWithProps) {
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
