import {Injectable} from '@angular/core';
import {map as LMap} from 'leaflet';
import {Feature, MapMarkerResponse} from '@shared/models/map-marker.model';
import {ICON_DOGGYBAG, ICON_DOGZONE, ICON_WATERFOUNTAIN} from '@shared/marker.constants';
import {ApiService} from '@shared/services/api.service';
import {first, map, tap} from 'rxjs/operators';
import {environment} from '@env/environment';
import {List} from 'immutable';
import {addToMap, filterByPropertyAndReturnFeatureList} from '@shared/services/marker.helper';

const API_DOGZONES_VIENNA = environment.dogzonesAPI;
const API_WATERFOUNTAINS_VIENNA = environment.waterfountainsAPI;
const API_DOGGYBAG_VIENNA = environment.poobagAPI;

@Injectable({
  providedIn: 'root',
})
export class MarkerService {
  constructor(private apiService: ApiService) {
  }

  /**
   * Fetches waterfountain data from vienna and places mapbox marker
   *
   * @param karte Leaflet mapbox
   */
  addWaterFountains(karte: LMap): void {
    this.apiService
      .getData$<MapMarkerResponse>(API_WATERFOUNTAINS_VIENNA)
      .pipe(
        filterByPropertyAndReturnFeatureList('NAME', 'Auslaufbrunnen'),
        tap((auslaufbrunnen: List<Feature>) => {
          auslaufbrunnen.map(addToMap(karte, ICON_WATERFOUNTAIN));
        }),
        first()
      ).subscribe({
      next: null,
      error: console.error,
      complete: () => console.log('added Waterfountains to the map')
    });
  }

  /**
   * Fetches dog zone data from vienna and places mapbox marker
   *
   * @param map Leaflet mapbox
   */
  addDogzones(karte: LMap): void {
    this.apiService.getData$<MapMarkerResponse>(API_DOGZONES_VIENNA)
      .pipe(
        filterByPropertyAndReturnFeatureList('TYP', 'Hundezone'),
        tap((hundezonen: List<Feature>) => {
          hundezonen.map(addToMap(karte, ICON_DOGZONE));
        }),
        first()
      ).subscribe({
      next: null,
      error: console.error,
      complete: () => console.log('added Dogzones to the map')
    });
  }

  /**
   * Fetches doggy bag data from Vienna and places mapbox marker
   *
   * @param map Leaflet mapbox
   */
  addDoggybags(karte: LMap): void {
    this.apiService.getData$<MapMarkerResponse>(API_DOGGYBAG_VIENNA)
      .pipe(
        map((data: MapMarkerResponse) => List(data.features)),
        tap((doggybags: List<Feature>) => {
          doggybags.map(addToMap(karte, ICON_DOGGYBAG));
        }),
        first()
      ).subscribe({
      next: null,
      error: console.error,
      complete: () => console.log('added Poobags to the map')
    });
  }
}
