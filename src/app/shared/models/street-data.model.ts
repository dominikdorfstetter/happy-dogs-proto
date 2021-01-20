// eslint @typescript-eslint/naming-convention: 0
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
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Bezirk: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Adresse: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  CountryCode: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  StreetName: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  CountrySubdivision: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Municipality: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  MunicipalitySubdivision: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Kategorie: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Zaehlbezirk: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Zaehlgebiet: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Ranking: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  SCD: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
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
