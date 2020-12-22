export interface Properties {
  name: string;
}

export interface Crs {
  type: string;
  properties: Properties;
}

export interface Geometry {
  type: string;
  coordinates: number[];
}

export interface Properties2 {
  Bezirk: string;
  Adresse: string;
  CountryCode: string;
  StreetName: string;
  CountrySubdivision: string;
  Municipality: string;
  MunicipalitySubdivision: string;
  Kategorie: string;
  Zaehlbezirk: string;
  Zaehlgebiet: string;
  Ranking: number;
  SCD: string;
  GIP_NAME_ID: number;
}

export interface Feature {
  type: string;
  geometry: Geometry;
  bbox: number[];
  properties: Properties2;
}

export interface StreetDataResponse {
  type: string;
  crs: Crs;
  bbox: number[];
  features: Feature[];
}
