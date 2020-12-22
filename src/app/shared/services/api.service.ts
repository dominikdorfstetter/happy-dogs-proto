import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { StreetDataResponse } from '@shared/models/street-data.model';
import { CacheItem } from '@shared/models/cache-item.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  /**
   * Writes data to localStorage
   * @param cacheID Cache ID
   * @param data any data
   */
  static setCache<T>(cacheID: string, data: T): void {
    const cacheItem = JSON.parse(localStorage.getItem(cacheID)) as CacheItem<T>;
    const cacheItemData = cacheItem.getData() as T;

    if (!!data && !!cacheItem && !cacheItem.getData()) {
      localStorage.setItem(cacheID, JSON.stringify(new CacheItem<T>(data)));
    }
  }

  constructor(private http: HttpClient) {}

  /**
   * Gets data via httpClient but checks if data is cached
   * If data is cached returns an observable of the cache-data instead
   * @param cacheID cache ID
   * @param url URL to get data from
   */
  public getDataCheckCache$<T>(url: string, cacheID: string = null): Observable<T> {
    if (!!cacheID) {
      if (!localStorage.getItem(cacheID)) {
        return this.getData$<T>(url);
      } else {
        let cacheItem = JSON.parse(localStorage.getItem(cacheID)) as any;
        cacheItem = new CacheItem<T>(cacheItem.pData, cacheItem.valid);
        return !!cacheItem.getData() ? of(cacheItem.getData()) : this.getData$<T>(url);
      }
    } else {
      return this.getData$<T>(url);
    }
  }

  /**
   * Fetches data from URL
   * @param url URL to get data from
   * @private
   */
  private getData$<T>(url: string): Observable<T> {
    return this.http.get<T>(url).pipe(
      filter((data: T) => !!data),
      take(1)
    );
  }

  /**
   * Fetches street data from open data Austria
   * URL: https://data.wien.gv.at/daten/OGDAddressService.svc/GetAddressInfo?Address=
   * @param searchText text to query for
   */
  getStreetData(searchText: string): Observable<StreetDataResponse> {
    const URL = `https://data.wien.gv.at/daten/OGDAddressService.svc/GetAddressInfo?Address=${searchText}`;
    return this.getData$<StreetDataResponse>(URL);
  }
}
