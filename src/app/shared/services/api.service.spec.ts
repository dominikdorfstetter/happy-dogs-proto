import {ApiService} from '@shared/services/api.service';
import {MarkerService} from '@shared/services/marker.service';
import {HttpClient} from '@angular/common/http';
import {of} from 'rxjs';
import {APIResponse} from '@shared/models/api-response.model';
import * as L from 'leaflet';
import {TestBed} from '@angular/core/testing';

const MOCK_FEATURE = {
  geometry: {
    coordinates: [0, 0],
  },
  geometry_name: 'test',
  id: 'test',
  properties: {},
  type: 'test',
};

const MOCK_RESPONSE = {
  crs: {
    properties: {},
    type: 'test',
  },
  features: [MOCK_FEATURE, MOCK_FEATURE],
  totalFeatures: 2,
  type: 'test',
} as APIResponse;

describe('ApiService', () => {
  let service: ApiService;
  let markerS: MarkerService;
  let http: HttpClient;
  // tslint:disable-next-line:prefer-const
  let map: L.map;
  let httpGetSpy: jest.SpyInstance;
  let addMarkerToMapSpy: jest.SpyInstance;

  beforeEach(() => {
    http = {
      get: () => jest.fn(),
    } as any;
    markerS = {
      addMarkerToMap: () => {
      },
    } as any;

    httpGetSpy = jest.spyOn(http, 'get');
    addMarkerToMapSpy = jest.spyOn(markerS, 'addMarkerToMap');
    httpGetSpy.mockReturnValue(of(MOCK_RESPONSE));
    addMarkerToMapSpy.mockImplementation(() => {
    });

    TestBed.configureTestingModule({
      providers: [
        ApiService,
        {provide: MarkerService, useValue: markerS},
        {provide: HttpClient, useValue: http}]
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch waterfountain data', () => {
    service.addWaterFountains(map);
    expect(httpGetSpy).toBeCalledTimes(1);
    expect(addMarkerToMapSpy).toBeCalledTimes(2);
  });

  it('should fetch poobag data', () => {
    service.addPoobags(map);
    expect(httpGetSpy).toBeCalledTimes(1);
    expect(addMarkerToMapSpy).toBeCalledTimes(2);
  });

  it('should fetch dogzone data', () => {
    httpGetSpy.mockReturnValueOnce(
      of({
        ...MOCK_RESPONSE,
        features: [
          {
            ...MOCK_FEATURE,
            properties: {
              TYP: 'Hundezone',
            },
          },
        ],
      })
    );
    service.addDogzones(map);
    expect(httpGetSpy).toBeCalledTimes(1);
    expect(addMarkerToMapSpy).toBeCalledTimes(1);
  });
});
