export interface Geometry {
  type: string;
  coordinates: number[];
}

export interface Feature {
  type: string;
  id: string;
  geometry: Geometry;
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

export interface APIResponse {
  type: string;
  totalFeatures: number;
  features: Feature[];
  crs: Crs;
}
