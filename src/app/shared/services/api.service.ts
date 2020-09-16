import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {filter, take} from 'rxjs/operators';
import {APIResponse, Feature} from '@shared/models/api-response.model';
import {
  ICON_WATERFOUNTAIN,
  ICON_DOGZONE,
  ICON_DOGGYBAG,
} from '@shared/marker.constants';
import {HttpClient} from '@angular/common/http';
import {MarkerService} from '@shared/services/marker.service';
import * as L from 'leaflet';

const API_DOGZONES_VIENNA =
  'https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0' +
  '&typeName=ogdwien:HUNDEZONEOGD&srsName=EPSG:4326&outputFormat=json';
const API_WATERFOUNTAINS_VIENNA =
  'https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0' +
  '&typeName=ogdwien:TRINKBRUNNENOGD&srsName=EPSG:4326&outputFormat=json';
const API_DOGGYBAG_VIENNA =
  'https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0' +
  '&typeName=ogdwien:HUNDESACKERLOGD&srsName=EPSG:4326&outputFormat=json';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  /**
   * Writes data to localStorage
   * @param cacheID Cache ID
   * @param data any data
   */
  private static setCache(cacheID: string, data: any): void {
    if (data) {
      localStorage.setItem(cacheID, JSON.stringify(data));
    }
  }

  constructor(private http: HttpClient, private markerS: MarkerService) {
  }

  /**
   * Gets data via httpClient but checks if data is cached
   * If data is cached returns an observable of the cache-data instead
   * @param cacheID cache ID
   * @param url URL to get data from
   */
  private getData$<T>(cacheID: string, url: string): Observable<T> {
    if (!localStorage.getItem(cacheID)) {
      return this.http.get<T>(url).pipe(
        filter((data: T) => !!data),
        take(1)
      );
    } else {
      return of(JSON.parse(localStorage.getItem(cacheID))) as Observable<T>;
    }
  }

  /**
   * Fetches waterfountain data from vienna and places map marker
   * @param map Leaflet map
   */
  addWaterFountains(map: L.map): void {
    const cacheID = 'waterfountain_data';

    this.getData$<APIResponse>(cacheID, API_WATERFOUNTAINS_VIENNA).subscribe(
      (data: APIResponse) => {
        data.features.forEach((el: Feature) => {
          this.markerS.addMarkerToMap(
            map,
            el.geometry.coordinates,
            ICON_WATERFOUNTAIN
          );
        });
        ApiService.setCache(cacheID, data);
      }
    );
  }

  /**
   * Fetches dog zone data from vienna and places map marker
   * @param map Leaflet map
   */
  addDogzones(map: L.map): void {
    const cacheID = 'dogzone_data';

    this.getData$<APIResponse>(cacheID, API_DOGZONES_VIENNA).subscribe(
      (data: APIResponse) => {
        data.features.forEach((el: Feature) => {
          if (el.properties.TYP === 'Hundezone') {
            this.markerS.addMarkerToMap(
              map,
              el.geometry.coordinates,
              ICON_DOGZONE
            );
          }
        });
        ApiService.setCache(cacheID, data);
      }
    );
  }

  /**
   * Fetches doggy bag data from vienna and places map marker
   * @param map Leaflet map
   */
  addPoobags(map: L.map): void {
    const cacheID = 'poobag_data';

    this.getData$(cacheID, API_DOGGYBAG_VIENNA).subscribe(
      (data: APIResponse) => {
        data.features.forEach((el: Feature) => {
          this.markerS.addMarkerToMap(
            map,
            el.geometry.coordinates,
            ICON_DOGGYBAG
          );
        });
        ApiService.setCache(cacheID, data);
      }
    );
  }
}
