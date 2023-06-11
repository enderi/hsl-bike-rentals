import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BikeStationInfo } from '../model/bike-station-info';
import { HttpClient } from '@angular/common/http';
import { Station } from '../model/station';
import { RentalsAndReturns } from '../model/rentals-by-month';

@Injectable({
  providedIn: 'root',
})
export class BikeStationsService {
  private readonly _selectedStation = new Subject<BikeStationInfo>();

  get selectedStation() {
    return this._selectedStation;
  }

  constructor(private httpClient: HttpClient) {}

  fetchSelected(id: number) {
    return this.fetchBikeStationInfo(id).subscribe((resp) => {
      this._selectedStation.next(resp);
    });
  }

  fetchBikeStations() {
    return this.httpClient.get<Station[]>('/api/bike-stations');
  }

  fetchBikeStationInfo(id: number): Observable<BikeStationInfo> {
    return this.httpClient.get<BikeStationInfo>(`/api/bike-stations/${id}`);
  }

  fetchRentalsByMonth() {
    return this.httpClient.get<RentalsAndReturns>('/api/bike-rentals/by-date');
  }
}
