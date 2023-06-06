import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as leaflet from 'leaflet';
import {heatData} from "./data";
import * as HeatmapOverlay from 'heatmap.js';

declare const HeatmapOverlay: any;


interface Station {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  stationsById: { [key: number]: Station } = {};
  map!: L.Map;
  markers: L.Marker[] = [];
  // options = {
  //   layers: [
  //     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  //     })
  //   ],
  //   zoom: 11,
  //   center: { lat: 60.192059, lng: 24.945831 }
  // }

  layersControl = {
    baseLayers: {
    },
    overlays: {
    }
  }

  stations: Station[] = [];
  constructor(private httpClient: HttpClient,) {
    this.httpClient.get('/api/bike-rentals/by-date')
      .subscribe(resp => {
      });
  }

  private initMap(): void {
    // Initialising map with center point by using the coordinates
    // Setting initial zoom to 3
    this.map = leaflet.map('map', {
      center: [ 39.8282, -98.5795 ],
      zoom: 3
    });

    // Initialising tiles to the map by using openstreetmap
    // Setting zoom levels
    const tiles = leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    // Adding tiles to the map
    tiles.addTo(this.map);

    // Setting up heat layer config
    const heatLayerConfig = {
      "radius": 5,
      "maxOpacity": .8,
      "scaleRadius": true,
      // property below responsible for colorization of heat layer
      "useLocalExtrema": true,
      // here we need to assign property value which represent lat in our data
      latField: 'lat',
      // here we need to assign property value which represent lng in our data
      lngField: 'lng',
      // here we need to assign property value which represent valueField in our data
      valueField: 'count'
    };

    // Initialising heat layer and passing config
    const heatmapLayer = new HeatmapOverlay(heatLayerConfig);

    //Passing data to a layer
    heatmapLayer.setData(heatData);

    //Adding heat layer to a map
    heatmapLayer.addTo(this.map);
  }

  // initMarkers() {
  //   this.httpClient.get<Station[]>('/api/bike-stations')
  //     .subscribe(resp => {
  //       this.stations = resp;
  //       resp.forEach(s => {
  //         this.stationsById[s.id] = s;
  //         const marker = this.generateMarker(s)
  //         marker.addTo(this.map).bindTooltip(`<p>${s.name}</p>`);
  //         this.markers.push(marker);
  //       });
  //       console.log(this.stationsById);
  //     })
  // }

  // generateMarker(station: Station) {
  //   return L.marker({ lat: station.latitude, lng: station.longitude }, { draggable: false })
  //     .on('click', (event) => this.markerClicked(station));
  // }

  // onMapReady($event: L.Map) {
  //   this.map = $event;
  //   //this.initMarkers();
  //   var heat = L.heatLayer([
  //     [50.5, 30.5, 0.2], // lat, lng, intensity
  //     [50.6, 30.4, 0.5],
  //   ], {radius: 25}).addTo(this.map);
  // }

  markerClicked(station: Station) {
    console.log(station);
  }

  ngOnInit(): void {
    this.initMap();
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
