export interface LocationResult {
  name: string;
  lat: number;
  lng: number;
  country?: string;
  state?: string;
}

export interface LocationProvider {
  search(query: string): Promise<LocationResult[]>;
}