export interface RentalsAndReturns {
    rentals: RentalsByMonth[];
    returns: RentalsByMonth[];
}

export interface RentalsByMonth {
    stationId: number;
    year: number;
    month: number;
    count: number;
}