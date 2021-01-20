import { MarkerService } from '@shared/services/marker.service';
import * as L from 'leaflet';

describe('MarkerService', () => {
  let mapMock: any;
  let markerS: MarkerService;

  beforeEach(() => {
    markerS = new MarkerService(mapMock);
    mapMock = {};
  });

  it('should be defined', () => {
    expect(markerS).toBeDefined();
  });

  it('should add marker to map', () => {
    mapMock = {
      addLayer: () => {},
    } as any;
    const addMarkerToMapSpy = jest.spyOn(markerS, 'addMarkerToMap');
    markerS.addMarkerToMap(mapMock, [1, 1], {} as L.Icon);
    expect(addMarkerToMapSpy).toHaveBeenCalled();
  });
});
