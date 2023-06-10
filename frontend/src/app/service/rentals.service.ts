import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Station } from '../model/station';
import { RentalsAndReturns, RentalsByMonth } from '../model/rentals-by-month';
import { BikeStationInfo } from '../model/bike-station-info';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentalsService {

  constructor(private httpClient: HttpClient) { }

  fetchBikeStations() {
    return this.httpClient.get<Station[]>('/api/bike-stations');
  }

  fetchBikeStationInfo(id: number): Observable<BikeStationInfo> {
    return this.httpClient.get<BikeStationInfo>(`/api/bike-stations/${id}`);
  }

  fetchRentalsByMonth(year: number, month: number) {
    return this.httpClient.get<RentalsAndReturns>('/api/bike-rentals/by-date');
  }
}
