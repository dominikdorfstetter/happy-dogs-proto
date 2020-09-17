import {Component, OnInit, AfterViewInit} from '@angular/core';
import {ApiService} from '@shared/services/api.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, AfterViewInit {
  map: L.map;

  constructor(private apiS: ApiService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.populateMap();
    this.getGeoLocation();
    this.apiS.addWaterFountains(this.map);
    this.apiS.addDogzones(this.map);
    // this.apiS.addPoobags(this.map);
  }

  private initMap(): void {
    this.map = L.map('map').setView([48.210033, 16.363449], 18);
  }

  private populateMap(): void {
    const tiles = L.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
      {
        maxZoom: 25,
        id: 'mapbox/streets-v11',
        tileSize: 256,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        accessToken: 'pk.eyJ1IjoiZG9taW5pa2RvcmZzdGV0dGVyIiwiYSI6ImNrZTQyOWk1NTBvankycW1zbHB3ZmI1ZzAifQ.Nn6ldXhhXF50Y2WNzdVgTg'
      }
    );

    tiles.addTo(this.map);
  }

  private getGeoLocation(): void {
    const map = this.map;
    map.locate({setView: true});

    // tslint:disable-next-line:typedef
    function onLocationFound(e) {
      const radius = e.accuracy / 2;
      const circle = L.circle(e.latlng, radius);
      const marker = L.marker(e.latlng);

      marker.addTo(map);
      circle.addTo(map);
    }

    map.on('locationfound', onLocationFound);
  }

}
