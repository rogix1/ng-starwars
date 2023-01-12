import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CharacterResponse, People, PlanetResponse } from './model';
import { EMPTY, Observable, of, tap } from 'rxjs';

const API_URL = 'https://www.swapi.tech/api';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  peopleCache = new Map<string, People>();
  characterCache = new Map<string, CharacterResponse>();
  planetCache = new Map<string, PlanetResponse>();

  constructor(private http: HttpClient) {}

  fetchData<T>(url: string | null, cache: Map<string, T>): Observable<T> {
    if (!url) {
      return EMPTY;
    }
    const data = cache.get(url);
    if (data) {
      return of(data);
    }
    return <Observable<T>>this.http.get(url).pipe(
      tap(data => {
        cache.set(url, <T>data);
      })
    );
  }

  loadPeople(): Observable<People> {
    return this.fetchData<People>(API_URL + '/people?page=1&limit=10', this.peopleCache);
  }

  loadPreviousPage(people: People): Observable<People> {
    return this.fetchData<People>(people.previous, this.peopleCache);
  }

  loadNextPage(people: People): Observable<People> {
    return this.fetchData<People>(people.next, this.peopleCache);
  }

  loadCharacter(id: string): Observable<CharacterResponse> {
    return this.fetchData<CharacterResponse>(`${API_URL}/people/${id}`, this.characterCache);
  }

  loadPlanet(planetUrl: string): Observable<PlanetResponse> {
    return this.fetchData<PlanetResponse>(planetUrl, this.planetCache);
  }
}
