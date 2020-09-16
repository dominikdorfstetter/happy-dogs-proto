import { Injectable } from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root',
})
export class MarkerService {
  constructor() {}

  /**
   * Adds Marker to Map, supports custom markers
   * @param map Leaflet Map
   * @param [lat, lng] latitude, longitude
   * @param icon Leaflet Icon
   */
  public addMarkerToMap(map: L.map, [lat, lng]: number[], icon: L.icon): void {
    L.marker([lng, lat], { icon }).addTo(map);
  }
}
