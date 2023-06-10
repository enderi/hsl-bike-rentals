import { RentalsByMonth } from "./model/rentals-by-month";
import { Station } from "./model/station"

export interface StationInfo {
    info: Meta;
    returns: { [key: string]: number };
    departures: { [key: string]: number };
    totalDepartures: number;
    totalReturns: number;
}

export interface Meta {
    id: number;
    name: string;
    lat: number;
    lng: number;
}

export interface TrafficPerHour {
    hour: number;
    stationId: number;
    count: number
}

const stationsById: { [key: number]: StationInfo } = {};

const initStation = (id: number): StationInfo => {
    stationsById[id] = stationsById[id] || {
        info: null,
        departures: {},
        returns: {},
        totalDepartures: 0,
        totalReturns: 0
    };

    return stationsById[id];
}

const addStation = (station: Station) => {
    const stationInfo = initStation(station.id);
    stationInfo.info = {
        id: station.id,
        name: station.name,
        lat: station.lat,
        lng: station.lng,
    }
}

const getStation = (id: number) => {
    return stationsById[id];
}

const addDeparture = (trafficPerHour: RentalsByMonth) => {
    const stationInfo = initStation(trafficPerHour.stationId);
    const d = buildDate(trafficPerHour.year, trafficPerHour.month);
    stationInfo.departures[d] = trafficPerHour.count;
    stationInfo.totalDepartures += trafficPerHour.count;
}

const addreturn = (trafficPerHour: RentalsByMonth) => {
    const stationInfo = initStation(trafficPerHour.stationId);
    const d = buildDate(trafficPerHour.year, trafficPerHour.month);
    stationInfo.returns[d] = trafficPerHour.count;
    stationInfo.totalReturns += trafficPerHour.count;
}

const buildDate = (year: number, month: number, day?: number): string => {
    if(day) {
        return `${year}-${month}-${day}`
    }
    return `${year}-${month}`;
}

const getStationIds = () => {
    return Object.keys(stationsById);
}

const getStationTraffic = (stationId: any): StationInfo => {
    return stationsById[stationId];
}

const getRanges = () => {
    let min: number | null = null;
    let max: number = 0;
    Object.entries(stationsById)
        .forEach(([key, value]) => {
            max = Math.max(max, value.totalDepartures, value.totalReturns);
            if (!min && min !== 0) {
                min = Math.min(value.totalDepartures, value.totalReturns);
            } else if (min !== 0) {
                min = Math.min(min, value.totalDepartures, value.totalReturns);
            }
        });
    return {
        min,
        max
    }
}

export { addStation, getStation, addDeparture, addreturn, getRanges, getStationIds, getStationTraffic }