import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, throwIfEmpty } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { StreetDataResponse } from '@shared/models/street-data.model';
import { NEVER } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  /**
   * Fetches street data from open data Austria
   * URL: https://data.wien.gv.at/daten/OGDAddressService.svc/GetAddressInfo?Address=
   *
   * @param searchText text to query for
   */
  getStreetData(searchText: string): Observable<StreetDataResponse> {
    const URL = `https://data.wien.gv.at/daten/OGDAddressService.svc/GetAddressInfo?Address=${searchText}`;
    return this.getData$<StreetDataResponse>(URL);
  }

  /**
   * Fetches data from URL
   *
   * @param url URL to get data from
   * @private
   */
  getData$<T>(url: string): Observable<T> {
    return this.http.get<T>(url).pipe(
      throwIfEmpty(() => new Error('No data emitted')),
      catchError(() => this.handleError())
    );
  }

  private handleError(): Observable<any> {
    return NEVER;
  }
}
