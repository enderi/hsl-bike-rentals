import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { StationInfo } from "../station-traffic";
import { HttpClient } from "@angular/common/http";
import { RentalsService } from "./rentals.service";
import { BikeRentalView } from "../model/bike-rental-view";
import { BikeStationInfo } from "../model/bike-station-info";

@Injectable({
    providedIn: 'root'
  })
  export class BikeStationsService {
    private readonly _selectedStation = new Subject<BikeStationInfo>();

    get selectedStation() {
        return this._selectedStation;
    }

    constructor(private rentalsService: RentalsService) {
    }

    fetchSelected(id: number){
        return this.rentalsService.fetchBikeStationInfo(id)
        .subscribe(resp => {
            this._selectedStation.next(resp);
        })
    }
  }