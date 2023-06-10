import { Component, NgZone, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { Station } from './model/station';
import { Meta, StationInfo, addDeparture, addStation, addreturn, getRanges, getStationIds, getStationTraffic } from './station-traffic';
import { RentalsService } from './service/rentals.service';
import { forkJoin } from 'rxjs';
import { BikeStationsService } from './service/bike-stations.service';
import { MapService } from './map/map.service';
import { MapEvents } from './map/map-events';


declare const HeatmapOverlay: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {  
  stations: Station[] = [];
  constructor(private httpClient: HttpClient, private rentalsService: RentalsService,
    private mapService: MapService) {
  }


  initMarkers() {
    forkJoin({ stations: this.rentalsService.fetchBikeStations(), rentalsAndReturns: this.rentalsService.fetchRentalsByMonth(1, 1)})
      .subscribe((result) => {
        result.stations.forEach(st => addStation(st));
        result.rentalsAndReturns.rentals.forEach(rent => addDeparture(rent));
        result.rentalsAndReturns.returns.forEach(ret => addreturn(ret));
        this.mapService.buildMarkers();
      });
  }

  mapEvent(event: any) {
    if (event === MapEvents.initialized) {
      this.initMarkers();
    }
  }


  fileSelected(event: any) {
    if (event) {
      this.upload(event.target.files[0])
    }
  }

  private upload(file: File) {
    console.log('uploading', file);
    let formData = new FormData();
    formData.append('file', file);
    this.httpClient.post('/api/bike-rentals/upload', formData)
      .subscribe(resp => {
        console.log('done');
      });
  }
}
