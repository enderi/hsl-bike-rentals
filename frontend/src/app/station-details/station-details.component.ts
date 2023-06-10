import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { RentalsService } from '../service/rentals.service';
import { BikeStationsService } from '../service/bike-stations.service';
import { Meta, StationInfo, getStation } from '../station-traffic';
import { Observable, Subscription } from 'rxjs';
import { BikeStationInfo } from '../model/bike-station-info';
import { Chart, registerables } from 'chart.js';
import { MapService } from '../map/map.service';
import { MapEvents } from '../map/map-events';
Chart.register(...registerables);

@Component({
  selector: 'app-station-details',
  templateUrl: './station-details.component.html',
  styleUrls: ['./station-details.component.css']
})
export class StationDetailsComponent implements OnDestroy {
  private mapService: MapService;
  private selectedStation: Subscription;
  private bikeStationsService: BikeStationsService;
  private chart!: Chart;

  stats: { totalReturns: number, totalRentals: number, topDestinations: { info: Meta, entries: number }[] } = {
    totalReturns: 0,
    totalRentals: 0,
    topDestinations: []
  };

  stationInfo: BikeStationInfo | undefined;

  constructor(bSService: BikeStationsService, mapService: MapService) {
    this.mapService = mapService;
    this.bikeStationsService = bSService;
    this.selectedStation = this.bikeStationsService.selectedStation.subscribe((w) => this.change(w));
  }

  ngOnDestroy(): void {
    this.selectedStation.unsubscribe();
  }

  clicked(station: Meta) {
    const stationInfo = getStation(station.id);
    this.mapService.emit(MapEvents.centerMap, { lat: stationInfo.info.lat, lng: stationInfo.info.lng, zoom: 13 });
    this.mapService.highlightStation(station.id);
  }

  mouseover(station: Meta) {
    this.mapService.highlightStation(station.id);
  }

  mouseout(station: Meta) {
    this.mapService.resetStation(station.id);
  }


  private change(to: BikeStationInfo) {
    this.mapService.emit(MapEvents.centerMap, { lat: to.station.lat, lng: to.station.lng, zoom: 13 })
    this.stationInfo = to;
    this.findPeakHours(to);
  }

  private findPeakHours(data: BikeStationInfo) {
    const departureTargets: { [key: number]: number } = {}
    let totalRentals = 0;
    let totalReturns = 0;
    const rentalsByHour = Array.apply(null, Array(24)).map(() => 0);
    const returnsByHour = Array.apply(null, Array(24)).map(() => 0);
    data.rentals
      .forEach(r => {
        rentalsByHour[r.departureHour]++;
        totalRentals++;
        departureTargets[r.returnStationId] = departureTargets[r.returnStationId] || 0;
        departureTargets[r.returnStationId]++;
      });
    data.returns
      .forEach(r => {
        returnsByHour[r.departureHour]++;
        totalReturns++;
      });


    this.stats = {
      totalRentals,
      totalReturns,
      topDestinations: Object.entries(departureTargets).sort((a, b) => a[1] - b[1]).reverse().map(r => {
        return {
          info: getStation(+r[0]).info,
          entries: r[1]
        };
      })
    }
    const chartData = {
      labels: [...Array(24).keys()],
      datasets: [
        {
          label: 'Departures',
          data: rentalsByHour,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.4
        },
        {
          label: 'Returns',
          data: returnsByHour,
          fill: false,
          borderColor: 'rgb(175, 92, 92)',
          tension: 0.4
        }
      ]
    };
    if (this.chart) {
      this.chart.data = chartData;
      this.chart.update();
    } else if (!this.chart) {
      this.chart = new Chart('peakHoursChart', {
        type: 'line',
        data: chartData,
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top'
            },
            title: {
              display: true,
              text: 'Traffic by hour'
            }
          },
          scales: {
            y: {
              suggestedMin: 0,
            }
          }
        },
      });
    }
  }
}