import {TestBed, ComponentFixture} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {configureTestSuite} from 'ng-bullet';
import {CUSTOM_ELEMENTS_SCHEMA, DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

const headlineSelector = 'div[data-test-id=\'headline\']';
const subHeadlineSelector = 'div[data-test-id=\'subheadline\']';
const mapSelector = 'app-map[data-test-id=\'map\']';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let de: DebugElement;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeDefined();
  });

  it('should display headline', () => {
    expect(de.query(By.css(headlineSelector))).toBeDefined();
  });

  it('should display subheadline', () => {
    expect(de.query(By.css(subHeadlineSelector))).toBeDefined();
  });

  it('should display map', () => {
    expect(de.query(By.css(mapSelector))).toBeDefined();
  });

});
