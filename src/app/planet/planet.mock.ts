import { PlanetResponse } from '../model';

export const planetMock: PlanetResponse = {
  message: 'ok',
  result: {
    properties: {
      diameter: '10465',
      rotation_period: '23',
      orbital_period: '304',
      gravity: '1 standard',
      population: '200000',
      climate: 'arid',
      terrain: 'desert',
      surface_water: '1',
      name: 'Tatooine',
    },
    description: 'A planet.',
    _id: '5f7254c11b7dfa00041c6fae',
    uid: '1',
    __v: 0,
  },
};
