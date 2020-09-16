import {ComponentFixture, TestBed} from '@angular/core/testing';
import {configureTestSuite} from 'ng-bullet';
import {MapComponent} from './map.component';
import {ApiService} from '@shared/services/api.service';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;
  let apiService: any;
  let addWaterFountainSpy: jest.SpyInstance;
  let addPoobagsSpy: jest.SpyInstance;
  let addDogzonesSpy: jest.SpyInstance;

  configureTestSuite(() => {
    apiService = {
      addWaterFountains: () => jest.fn(),
      addDogzones: () => jest.fn(),
      addPoobags: () => jest.fn(),
    } as any;

    addWaterFountainSpy = jest.spyOn(apiService, 'addWaterFountains');
    addPoobagsSpy = jest.spyOn(apiService, 'addPoobags');
    addDogzonesSpy = jest.spyOn(apiService, 'addDogzones');

    TestBed.configureTestingModule({
      declarations: [MapComponent],
      imports: [],
      providers: [{provide: ApiService, useValue: apiService}]
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

  it('should call addPoobags', () => {
    expect(addPoobagsSpy).toHaveBeenNthCalledWith(1, component.map);
  });

});
