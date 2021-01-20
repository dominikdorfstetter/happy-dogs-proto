export interface Geometry {
  type: string;
  coordinates: number[];
}

export interface Feature {
  type: string;
  id: string;
  geometry: Geometry;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  geometry_name: string;
  properties: any;
}

export interface Properties2 {
  name: string;
}

export interface Crs {
  type: string;
  properties: Properties2;
}

export interface MapMarkerResponse {
  type: string;
  totalFeatures: number;
  features: Feature[];
  crs: Crs;
}
