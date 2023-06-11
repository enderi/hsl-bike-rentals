import { Meta, StationInfo } from '../station-traffic';
import { BikeRentalView } from './bike-rental-view';

export interface BikeStationInfo {
  station: Meta;
  rentals: BikeRentalView[];
  returns: BikeRentalView[];
}
