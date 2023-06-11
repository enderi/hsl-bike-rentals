import { BikeStationMeta } from '../bike-station-handler/bike-stations-handler';
import { BikeRentalView } from './bike-rental-view';

export interface BikeStationInfo {
  station: BikeStationMeta;
  rentals: BikeRentalView[];
  returns: BikeRentalView[];
}
