import { ApiService } from '@shared/services/api.service';
import { MarkerService } from '@shared/services/marker.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { MapMarkerResponse } from '@shared/models/map-marker.model';
import * as L from 'leaflet';
import { TestBed } from '@angular/core/testing';
import { LocalStorageMock } from '@shared/mock/localstorage.mock';

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
} as MapMarkerResponse;

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
      addMarkerToMap: () => {},
    } as any;

    httpGetSpy = jest.spyOn(http, 'get');
    addMarkerToMapSpy = jest.spyOn(markerS, 'addMarkerToMap');
    httpGetSpy.mockReturnValue(of(MOCK_RESPONSE));
    addMarkerToMapSpy.mockImplementation(() => {});

    Object.defineProperty(global, 'localStorage', { writable: true });
    // noinspection JSConstantReassignment
    global.localStorage = new LocalStorageMock();

    TestBed.configureTestingModule({
      providers: [ApiService, { provide: MarkerService, useValue: markerS }, { provide: HttpClient, useValue: http }],
    });
    service = TestBed.inject(ApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('WaterfountainData', () => {
    const API_RESPONSE = {
      ...MOCK_RESPONSE,
      features: [
        {
          ...MOCK_FEATURE,
          properties: {
            NAME: 'Auslaufbrunnen',
          },
        },
      ],
    };

    it('should call http get once, without cache', () => {
      httpGetSpy.mockReturnValueOnce(of(API_RESPONSE));
      markerS.addWaterFountains(map);
      expect(httpGetSpy).toBeCalledTimes(1);
    });

    it('should add 2 markers to the map, without cache', () => {
      httpGetSpy.mockReturnValueOnce(of(API_RESPONSE));
      markerS.addWaterFountains(map);
      expect(addMarkerToMapSpy).toBeCalledTimes(1);
    });

    it('should get data from cache', () => {
      const storageKey = 'waterfountain_data';
      // first set local storage
      localStorage.setItem(storageKey, JSON.stringify(API_RESPONSE));
      // set http get response also
      httpGetSpy.mockReturnValueOnce(of(API_RESPONSE));
      const lsGetItemSpy = jest.spyOn(localStorage, 'getItem');

      markerS.addWaterFountains(map);
      expect(lsGetItemSpy).toHaveBeenCalledWith(storageKey);
    });
  });

  describe('addPoobags', () => {
    beforeEach(() => {
      markerS.addPoobags(map);
    });

    it('should call http get once', () => {
      expect(httpGetSpy).toBeCalledTimes(1);
    });

    it('should add 2 markers to the map', () => {
      expect(addMarkerToMapSpy).toBeCalledTimes(2);
    });
  });

  describe('DogzoneData', () => {
    const API_RESPONSE = {
      ...MOCK_RESPONSE,
      features: [
        {
          ...MOCK_FEATURE,
          properties: {
            TYP: 'Hundezone',
          },
        },
      ],
    };

    beforeEach(() => {
      httpGetSpy.mockReturnValueOnce(of(API_RESPONSE));
      markerS.addDogzones(map);
    });

    it('should call http get once', () => {
      expect(httpGetSpy).toBeCalledTimes(1);
    });

    it('should add a marker to the map', () => {
      expect(addMarkerToMapSpy).toBeCalledTimes(1);
    });
  });
});
