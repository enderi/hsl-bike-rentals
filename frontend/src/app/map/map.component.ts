import * as L from 'leaflet';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MapService } from './map.service';
import { MapEvents } from './map-events';
import { CustomMarker } from './custom-marker';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent {
  map!: L.Map;
  options = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }),
    ],
    zoom: 11,
    center: { lat: 60.21, lng: 24.9 }, // todo: count from markers
  };

  constructor(private mapService: MapService) {
    mapService.markers.subscribe((m) => this.addMarkers(m));
    mapService.events.subscribe((e) => this.handleEvent(e));
  }

  private handleEvent(event: any) {
    if (event.name === MapEvents.moveToLatLng) {
      let zoom = this.map.getZoom();
      if (zoom < event.zoom ?? 11) {
        zoom = event.zoom;
      }
      this.map.flyTo({ lat: event.lat, lng: event.lng }, zoom);
    } else if (event.name === MapEvents.markerMouseOut) {
      const cm: CustomMarker = event.marker;
      cm.resetMarkerProps();
    } else if (event.name === MapEvents.markerMouseOver) {
      const cm: CustomMarker = event.marker;
      cm.hover();
    }
  }

  addMarkers(markers: CustomMarker[]) {
    markers.forEach((m) => m.marker.addTo(this.map));
  }

  onMapReady($event: L.Map) {
    this.map = $event;
    this.mapService.initMarkers();
  }
}
