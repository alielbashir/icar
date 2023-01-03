export interface Location {
  lat: number;
  lng: number;
}

export type Locations = Location[];

export interface Car {
  car_id: number;
  lat: number;
  lng: number;
}

export type Cars = Car[];

export interface Token {
  token: string;
}
