import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { configureTestSuite } from 'ng-bullet';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { BrowserModule, By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ClarityModule } from '@clr/angular';

const headlineSelector = "div[data-testid='headline']";
const subHeadlineSelector = "div[data-testid='subheadline']";
const mapSelector = "app-mapbox[data-testid='mapbox']";

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let de: DebugElement;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterTestingModule, BrowserModule, HttpClientModule, ClarityModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement;
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

  it('should display mapbox', () => {
    expect(de.query(By.css(mapSelector))).toBeDefined();
  });
});
