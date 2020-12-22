import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { Feature, MapMarkerResponse } from '@shared/models/map-marker.model';
import { ICON_DOGGYBAG, ICON_DOGZONE, ICON_WATERFOUNTAIN } from '@shared/marker.constants';
import { ApiService } from '@shared/services/api.service';
import { CacheItem } from '@shared/models/cache-item.model';
import { StreetDataResponse } from '@shared/models/street-data.model';
export const API_DOGZONES_VIENNA =
  'https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0' +
  '&typeName=ogdwien:HUNDEZONEOGD&srsName=EPSG:4326&outputFormat=json';
export const API_WATERFOUNTAINS_VIENNA =
  'https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0' +
  '&typeName=ogdwien:TRINKBRUNNENOGD&srsName=EPSG:4326&outputFormat=json';
export const API_DOGGYBAG_VIENNA =
  'https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0' +
  '&typeName=ogdwien:HUNDESACKERLOGD&srsName=EPSG:4326&outputFormat=json';

@Injectable({
  providedIn: 'root',
})
export class MarkerService {
  constructor(private apiService: ApiService) {}

  /**
   * Adds Marker to Map, supports custom markers
   * @param map Leaflet Map
   * @param [lat, lng] latitude, longitude
   * @param icon Leaflet Icon
   */
  public addMarkerToMap(map: L.map, [lat, lng]: number[], icon: L.icon): void {
    L.marker([lng, lat], { icon }).addTo(map);
  }

  /**
   * Fetches waterfountain data from vienna and places map marker
   * @param map Leaflet map
   */
  addWaterFountains(map: L.map): void {
    const cacheID = 'waterfountain_data';

    this.apiService
      .getDataCheckCache$<MapMarkerResponse>(API_WATERFOUNTAINS_VIENNA, cacheID)
      .subscribe((data: MapMarkerResponse) => {
        data.features.forEach((el: Feature) => {
          if (el.properties.NAME === 'Auslaufbrunnen') {
            this.addMarkerToMap(map, el.geometry.coordinates, ICON_WATERFOUNTAIN);
          }
        });
        ApiService.setCache<MapMarkerResponse>(cacheID, data);
      });
  }

  /**
   * Fetches dog zone data from vienna and places map marker
   * @param map Leaflet map
   */
  addDogzones(map: L.map): void {
    const cacheID = 'dogzone_data';

    this.apiService
      .getDataCheckCache$<MapMarkerResponse>(API_DOGZONES_VIENNA, cacheID)
      .subscribe((data: MapMarkerResponse) => {
        data.features.forEach((el: Feature) => {
          if (el.properties.TYP === 'Hundezone') {
            this.addMarkerToMap(map, el.geometry.coordinates, ICON_DOGZONE);
          }
        });
        ApiService.setCache<MapMarkerResponse>(cacheID, data);
      });
  }

  /**
   * Fetches doggy bag data from vienna and places map marker
   * @param map Leaflet map
   */
  addPoobags(map: L.map): void {
    const cacheID = 'poobag_data';

    this.apiService.getDataCheckCache$(API_DOGGYBAG_VIENNA, cacheID).subscribe((data: MapMarkerResponse) => {
      data.features.forEach((el: Feature) => {
        this.addMarkerToMap(map, el.geometry.coordinates, ICON_DOGGYBAG);
      });
      ApiService.setCache<MapMarkerResponse>(cacheID, data);
    });
  }
}
