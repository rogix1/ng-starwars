export interface People {
  message: string;
  total_records: number;
  total_pages: number;
  previous: string | null;
  next: string | null;
  results: Character[];
}

export interface Character {
  uid: string;
  name: string;
  url: string;
}

export interface Planet {
  diameter: string;
  rotation_period: string;
  orbital_period: string;
  gravity: string;
  population: string;
  climate: string;
  terrain: string;
  surface_water: string;
  name: string;
}

export interface CharacterDescription {
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  name: string;
  homeworld: string;
  url: string;
}

export interface CharacterResult {
  properties: CharacterDescription;
  description: string;
  _id: string;
  uid: string;
  __v: number;
}

export interface PlanetResult {
  properties: Planet;
  description: string;
  _id: string;
  uid: string;
  __v: number;
}

export interface PlanetResponse {
  message: string;
  result: PlanetResult;
}

export interface CharacterResponse {
  message: string;
  result: CharacterResult;
}
