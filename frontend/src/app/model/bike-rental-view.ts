export interface BikeRentalView {
  id: number;
  departureYear: number;
  departureMonth: number;
  departureDay: number;
  departureHour: number;
  departureTime: Date;
  departureStationId: number;
  returnYear: number;
  returnHour: number;
  returnMonth: number;
  returnDay: number;
  returnTime: number;
  returnStationId: number;
}
