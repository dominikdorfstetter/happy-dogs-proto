import { ComponentFixture, TestBed } from '@angular/core/testing';
import { configureTestSuite } from 'ng-bullet';
import { MapComponent } from './map.component';
import { MarkerService } from '@shared/services/marker.service';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  let markerS: any;
  let addWaterFountainSpy: jest.SpyInstance;
  let addDogzonesSpy: jest.SpyInstance;

  configureTestSuite(() => {
    markerS = {
      addWaterFountains: () => jest.fn(),
      addDogzones: () => jest.fn(),
    } as any;

    addWaterFountainSpy = jest.spyOn(markerS, 'addWaterFountains');
    addDogzonesSpy = jest.spyOn(markerS, 'addDogzones');

    TestBed.configureTestingModule({
      declarations: [MapComponent],
      imports: [],
      providers: [{ provide: MarkerService, useValue: markerS }],
    });
  });

  beforeAll(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  it('should initialize map', () => {
    expect(component.map).toBeDefined();
  });

  it('should call addWaterFountains', () => {
    expect(addWaterFountainSpy).toHaveBeenNthCalledWith(1, component.map);
  });

  it('should call addDogzones', () => {
    expect(addDogzonesSpy).toHaveBeenNthCalledWith(1, component.map);
  });

  it('should run getGeolocation', () => {
    (component as any).getGeoLocation();
  });
});
