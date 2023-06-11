import { Component, NgZone, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { Station } from './model/station';
import {
  Meta,
  StationInfo,
  addDeparture,
  addStation,
  addreturn,
  getRanges,
  getStationIds,
  getStationTraffic,
} from './station-traffic';
import { RentalsService } from './service/rentals.service';
import { forkJoin } from 'rxjs';
import { BikeStationsService } from './service/bike-stations.service';
import { MapService } from './map/map.service';
import { MapEvents } from './map/map-events';

declare const HeatmapOverlay: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  stations: Station[] = [];
  constructor() {}
}
