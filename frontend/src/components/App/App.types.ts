export interface Location {
  lat: number;
  lng: number;
}

export type Locations = Location[];

export interface Car {
  id: number;
  locations: Locations;
}

export type Cars = Car[];
