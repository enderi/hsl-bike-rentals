import { CircleMarker } from 'leaflet';
import * as L from 'leaflet';
import { StationInfo } from '../bike-station-handler/bike-stations-handler';

export class MarkerWithProps {
  private circleMarker: CircleMarker;
  private station: StationInfo;
  private props: { [key: string]: any };

  constructor(circleMarker: CircleMarker, station: StationInfo) {
    this.circleMarker = circleMarker;
    this.props = {};
    this.station = station;
  }

  public static of(station: StationInfo): MarkerWithProps {
    const props = MarkerWithProps.calculateProps(station);
    const marker = L.circleMarker(
      { lat: station.info.lat, lng: station.info.lng },
      props
    );
    const customMarker = new MarkerWithProps(marker, station);
    customMarker.setProps(props);
    return customMarker;
  }

  private static calculateProps(station: StationInfo): L.CircleMarkerOptions {
    const shadesOfRed = ['#f26161', '#f03939', '#ea0909', '#9a0707'];
    const shadesOfGreen = ['#73b9ee', '#5494da', '#3373c4', '#1750ac'];
    const diff = station.totalDepartures - station.totalReturns;
    const diffPer = Math.round((diff / station.totalDepartures) * 100);

    let color = 'gray';
    let radius = 10;
    let weight = 1;
    if (diff > 0) {
      color = '#f03939';
      if (diffPer < 5) {
        weight = 1;
        color = shadesOfRed[0];
      } else if (diffPer < 10) {
        weight = 1.2;
        radius = 11;
        color = shadesOfRed[1];
      } else if (diffPer < 20) {
        weight = 1.6;
        radius = 13;
        color = shadesOfRed[2];
      } else {
        weight = 2;
        radius = 16;
        color = shadesOfRed[3];
      }
    } else if (diff < 0) {
      color = 'green';
      if (diffPer > -5) {
        weight = 1;
        color = shadesOfGreen[0];
      } else if (diffPer > -10) {
        weight = 1.2;
        radius = 11;
        color = shadesOfGreen[1];
      } else if (diffPer > -20) {
        weight = 1.6;
        radius = 13;
        color = shadesOfGreen[2];
      } else {
        weight = 2;
        radius = 16;
        color = shadesOfGreen[3];
      }
    }
    const props: L.CircleMarkerOptions = {
      radius,
      color,
      fillColor: color,
      opacity: 1,
      fillOpacity: 0.5,
      weight,
    };
    return props;
  }

  public setProps(propObject: {}) {
    this.props = propObject;
  }

  public getProp(key: string): any {
    return this.props[key];
  }

  public hover() {
    this.marker.setStyle({ fillColor: 'orange', fillOpacity: 1 });
  }

  public resetMarkerProps() {
    this.marker.setStyle(this.props);
  }

  public bindListener(eventName: string, cb: any) {
    this.circleMarker.on(eventName, cb);
  }

  get marker() {
    return this.circleMarker;
  }

  get stationInfo(): StationInfo {
    return this.station;
  }

  public setSelected() {
    this.props['color'] = 'orange';
    this.props['weight'] = 3;
    this.props['opacity'] = 1;
    this.props['fillOpacity'] = 0.3;
    this.resetMarkerProps();
  }
  public unSelect() {
    this.props = MarkerWithProps.calculateProps(this.station);
    this.resetMarkerProps();
  }
}
