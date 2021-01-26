import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { Feature, MapMarkerResponse } from '@shared/models/map-marker.model';
import { ICON_DOGGYBAG, ICON_DOGZONE, ICON_WATERFOUNTAIN } from '@shared/marker.constants';
import { ApiService } from '@shared/services/api.service';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';

const API_DOGZONES_VIENNA = environment.dogzonesAPI;
const API_WATERFOUNTAINS_VIENNA = environment.waterfountainsAPI;
const API_DOGGYBAG_VIENNA = environment.poobagAPI;

@Injectable({
  providedIn: 'root',
})
export class MarkerService {
  constructor(private apiService: ApiService) {}

  /**
   * Adds Marker to Map, supports custom markers
   *
   * @param map Leaflet Map
   * @param [lat, lng] latitude, longitude
   * @param icon Leaflet Icon
   */
  public addMarkerToMap(smap: L.map, [lat, lng]: number[], icon: L.icon): void {
    L.marker([lng, lat], { icon }).addTo(smap);
  }

  /**
   * Fetches waterfountain data from vienna and places map marker
   *
   * @param karte Leaflet map
   */
  addWaterFountains(karte: L.map): void {
    const cacheID = 'waterfountain_data';
    const observable$ = this.apiService
      .getData$<MapMarkerResponse>(API_WATERFOUNTAINS_VIENNA)
      .pipe(
        map((data: MapMarkerResponse) => {
          console.log(data);
          return data;
        })
      )
      .subscribe((data: MapMarkerResponse) => {
        data.features.forEach((el: Feature) => {
          if (el.properties.NAME === 'Auslaufbrunnen') {
            this.addMarkerToMap(karte, el.geometry.coordinates, ICON_WATERFOUNTAIN);
          }
        });
        ApiService.setCache<MapMarkerResponse>(cacheID, data);
      });
  }

  /**
   * Fetches dog zone data from vienna and places map marker
   *
   * @param map Leaflet map
   */
  // eslint-disable-next-line no-shadow
  addDogzones(map: L.map): void {
    const cacheID = 'dogzone_data';

    this.apiService.getData$<MapMarkerResponse>(API_DOGZONES_VIENNA).subscribe((data: MapMarkerResponse) => {
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
   *
   * @param map Leaflet map
   */
  // eslint-disable-next-line no-shadow
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
