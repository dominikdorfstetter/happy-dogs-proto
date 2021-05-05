// filter MapMarkerResponse Object for a specific property that equals a text and return immutable List of Features
import {Feature, MapMarkerResponse} from '../models/map-marker.model';

import {Map as LMap, marker as Marker, icon as Icon } from 'leaflet';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {List} from 'immutable';

export const filterByPropertyAndReturnFeatureList = (property: string, text: string) => (data$: Observable<MapMarkerResponse>) =>
  data$.pipe(map<MapMarkerResponse, List<Feature>>((data: MapMarkerResponse) =>
      List(data.features.filter(isPropertyMatching(property, text)))));

// Checks if Property of Feature equals a text
const isPropertyMatching = (property: string, text) => (el: Feature) => {
  const propText = el.properties[property];
  return propText === text;
};

// Places Marker on the map
const addMarkerToMap = (karte: LMap, [lat, lng]: number[], icon: Icon): void => {
  Marker([lng, lat], {icon}).addTo(karte);
};

// Adds a Feature to the map
export const addToMap = (karte: LMap, icon: any) => (el: Feature) => addMarkerToMap(karte, el.geometry.coordinates, icon);
