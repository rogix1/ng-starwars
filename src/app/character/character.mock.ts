import { CharacterResponse } from '../model';

export const characterMock: CharacterResponse = {
  message: 'ok',
  result: {
    properties: {
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
      name: 'Luke Skywalker',
      homeworld: 'https://www.swapi.tech/api/planets/1',
      url: 'https://www.swapi.tech/api/people/1',
    },
    description: 'A person within the Star Wars universe',
    _id: '5f63a36eee9fd7000499be42',
    uid: '1',
    __v: 0,
  },
};
